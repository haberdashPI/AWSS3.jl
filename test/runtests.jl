#==============================================================================#
# OCAWS/test/runtests.jl
#
# Copyright Sam O'Connor 2014 - All rights reserved
#==============================================================================#


using OCAWS
using Base.Test

import OCAWS: @repeat, @protected, symdict, StrDict



#-------------------------------------------------------------------------------
# AWS Signature Version 4 test
#-------------------------------------------------------------------------------


function aws4_request_headers_test()

    r = symdict(
        creds         = symdict(
                        access_key_id = "AKIDEXAMPLE",
                        secret_key = "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY"
                        ),
        region        = "us-east-1",
        verb          = "POST",
        service       = "iam",
        url           = "http://iam.amazonaws.com/",
        content       = "Action=ListUsers&Version=2010-05-08",
        headers       = StrDict(
                        "Content-Type" =>
                        "application/x-www-form-urlencoded; charset=utf-8",
                        "Host" => "iam.amazonaws.com"
                        )
    )

    OCAWS.sign!(r, DateTime("2011-09-09T23:36:00"))

    h = r[:headers]
    out = join(["$k: $(h[k])\n" for k in sort(collect(keys(h)))])

    expected = (
        "Authorization: AWS4-HMAC-SHA256 " *
        "Credential=AKIDEXAMPLE/20110909/us-east-1/iam/aws4_request, " *
        "SignedHeaders=content-md5;content-type;host;" *
        "x-amz-content-sha256;x-amz-date, " *
        "Signature=1a6db936024345449ef4507f890c5161" *
                 "bbfa2ff2490866653bb8b58b7ba1554a\n" *
        "Content-MD5: r2d9jRneykOuUqFWSFXKCg==\n" *
        "Content-Type: application/x-www-form-urlencoded; " *
                     "charset=utf-8\n" *
        "Host: iam.amazonaws.com\n" *
        "x-amz-content-sha256: b6359072c78d70ebee1e81adcbab4f01" *
                             "bf2c23245fa365ef83fe8f1f955085e2\n" *
        "x-amz-date: 20110909T233600Z\n")

    @test out == expected
end

aws4_request_headers_test()


println("AWS4 Signature ok.")



#-------------------------------------------------------------------------------
# Load credentials...
#-------------------------------------------------------------------------------

aws = aws_config(region = "ap-southeast-2", lambda_bucket = "ocaws.jl.lambdatest")

println(iam_whoami(aws))



#-------------------------------------------------------------------------------
# Arn tests
#-------------------------------------------------------------------------------


@test arn(aws,"s3","foo/bar") == "arn:aws:s3:::foo/bar"
@test arn(aws,"s3","foo/bar") == s3_arn("foo","bar")
@test arn(aws,"s3","foo")     == s3_arn("foo")
@test arn(aws,"sqs", "au-test-queue", "ap-southeast-2", "1234") ==
      "arn:aws:sqs:ap-southeast-2:1234:au-test-queue"

@test arn(aws,"sns","*","*",1234) == "arn:aws:sns:*:1234:*"
@test arn(aws,"iam","role/foo-role", "", 1234) == 
      "arn:aws:iam::1234:role/foo-role"


println("ARNs ok.")



#-------------------------------------------------------------------------------
# Endpoint URL tests
#-------------------------------------------------------------------------------


import OCAWS: aws_endpoint


@test aws_endpoint("sqs", "us-east-1") == "http://sqs.us-east-1.amazonaws.com"
@test aws_endpoint("sdb", "us-east-1") == "http://sdb.amazonaws.com"
@test aws_endpoint("iam", "us-east-1") == "https://iam.amazonaws.com"
@test aws_endpoint("iam", "eu-west-1") == "https://iam.amazonaws.com"
@test aws_endpoint("sts", "us-east-1") == "https://sts.amazonaws.com"
@test aws_endpoint("sqs", "eu-west-1") == "http://sqs.eu-west-1.amazonaws.com"
@test aws_endpoint("sdb", "eu-west-1") == "http://sdb.eu-west-1.amazonaws.com"
@test aws_endpoint("sns", "eu-west-1") == "http://sns.eu-west-1.amazonaws.com"

@test aws_endpoint("s3", "us-east-1", "bucket") == 
      "http://bucket.s3.amazonaws.com"
@test aws_endpoint("s3", "eu-west-1", "bucket") ==
      "http://bucket.s3-eu-west-1.amazonaws.com"


println("Endpoints ok.")



#-------------------------------------------------------------------------------
# IAM tests
#-------------------------------------------------------------------------------

#=
test_user = "ocaws-jl-test-user-" * lowercase(format(now(),"yyyymmddTHHMMSSZ"))

user = iam_create_user(aws, test_user)
println(user)

user = iam_get_user(aws, test_user)
println(user)

iam_delte_user(aws, test_user)
=#


#-------------------------------------------------------------------------------
# SimpleDB tests
#-------------------------------------------------------------------------------


println(sdb_list_domains(aws))


println("SDB ok.")

#-------------------------------------------------------------------------------
# S3 tests
#-------------------------------------------------------------------------------

# Delete old test files...

for b in s3_list_buckets(aws)

    if ismatch(r"^ocaws.jl.test", b)
        
        println("Cleaning up old test bucket: " * b)
        for v in s3_list_versions(aws, b)
            s3_delete(aws, b, v["Key"]; version = v["VersionId"])
        end
        s3_delete_bucket(aws, b)
    end
end

# Temporary bucket name...

bucket_name = "ocaws.jl.test." * lowercase(Dates.format(now(Dates.UTC),"yyyymmddTHHMMSSZ"))


# Test exception code for deleting non existand bucket...

@protected try

    s3_delete_bucket(aws, bucket_name)

catch e
     @ignore if e.code == "NoSuchBucket" end
end


# Create bucket...

s3_create_bucket(aws, bucket_name)
#sleep(5)



@repeat 4 try

    # Turn on object versioning for this bucket...

    s3_enable_versioning(aws, bucket_name)

    # Check that the new bucket is returned in the list of buckets...

    @test bucket_name in s3_list_buckets(aws)


    # Check that our test keys do not exist yet...

    @test !s3_exists(aws, bucket_name, "key1")
    @test !s3_exists(aws, bucket_name, "key2")
    @test !s3_exists(aws, bucket_name, "key3")

catch e

    @delay_retry if e.code == "NoSuchBucket" end
end


# Create test objects...

s3_put(aws, bucket_name, "key1", "data1.v1")
s3_put(aws, bucket_name, "key2", "data2.v1")
s3_put(aws, bucket_name, "key3", "data3.v1")
s3_put(aws, bucket_name, "key3", "data3.v2")
s3_put(aws, bucket_name, "key3", "data3.v3")

# Check that test objects have expected content...

@test s3_get(aws, bucket_name, "key1") == b"data1.v1"
@test s3_get(aws, bucket_name, "key2") == b"data2.v1"
@test s3_get(aws, bucket_name, "key3") == b"data3.v3"

# Check object copy function...

s3_copy(aws, bucket_name, "key1";
        to_bucket = bucket_name, to_path = "key1.copy")

@test s3_get(aws, bucket_name, "key1.copy") == b"data1.v1"


url = s3_sign_url(aws, bucket_name, "key1")
@test readall(`curl -s -o - $url`) == "data1.v1"

fn = "/tmp/jl_qws_test_key1"
if isfile(fn)
    rm(fn)
end
@repeat 3 try
    s3_get_file(aws, bucket_name, "key1", fn)
catch e
    sleep(1)
    @retry if true end
end
@test readall(fn) == "data1.v1"
rm(fn)


# Check exists and list objects functions...

for key in ["key1", "key2", "key3", "key1.copy"]
    @test s3_exists(aws, bucket_name, key)
    @test key in [o["Key"] for o in s3_list_objects(aws, bucket_name)]
end

# Check delete...

s3_delete(aws, bucket_name, "key1.copy")

@test !("key1.copy" in [o["Key"] for o in s3_list_objects(aws, bucket_name)])

# Check metadata...

meta = s3_get_meta(aws, bucket_name, "key1")
@test meta["ETag"] == "\"68bc8898af64159b72f349b391a7ae35\""


# Check versioned object content...

versions = s3_list_versions(aws, bucket_name, "key3")
@test length(versions) == 3
@test (s3_get(aws, bucket_name, "key3"; version = versions[3]["VersionId"])
      == b"data3.v1")
@test (s3_get(aws, bucket_name, "key3"; version = versions[2]["VersionId"])
      == b"data3.v2")
@test (s3_get(aws, bucket_name, "key3"; version = versions[1]["VersionId"])
      == b"data3.v3")


# Check pruning of old versions...

s3_purge_versions(aws, bucket_name, "key3")
versions = s3_list_versions(aws, bucket_name, "key3")
@test length(versions) == 1
@test s3_get(aws, bucket_name, "key3") == b"data3.v3"


println("S3 ok.")



#-------------------------------------------------------------------------------
# SQS tests
#-------------------------------------------------------------------------------

test_queue = "ocaws-jl-test-queue-" * lowercase(Dates.format(now(Dates.UTC),"yyyymmddTHHMMSSZ"))

qa = sqs_create_queue(aws, test_queue)

qb = sqs_get_queue(aws, test_queue)

@test qa[:resource] == qb[:resource]


sqs_send_message(qa, "Hello!")

m = sqs_receive_message(qa)
@test m[:message] == "Hello!"

sqs_delete_message(qa, m)
sqs_flush(qa)

info = sqs_get_queue_attributes(qa)
@test info["ApproximateNumberOfMessages"] == "0"
@test sqs_count(qa) == 0


println("SQS ok.")



#-------------------------------------------------------------------------------
# SNS tests
#-------------------------------------------------------------------------------


test_topic = "ocaws-jl-test-topic-" * lowercase(Dates.format(now(Dates.UTC),"yyyymmddTHHMMSSZ"))

sns_create_topic(aws, test_topic)

sns_subscribe_sqs(aws, test_topic, qa; raw = true)

sns_publish(aws, test_topic, "Hello SNS!")

@repeat 5 try

    sleep(2)
    m = sqs_receive_message(qa)
    @test m != nothing && m[:message] == "Hello SNS!"

catch e
    @retry if true end
end


println("SNS ok.")



#-------------------------------------------------------------------------------
# DynamoDB tests
#-------------------------------------------------------------------------------


#r = dynamodb(aws, "ListTables", "{}")
#println(r)


println("Done!")



#==============================================================================#
# End of file.
#==============================================================================#