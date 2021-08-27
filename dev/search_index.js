var documenterSearchIndex = {"docs":
[{"location":"api/","page":"API","title":"API","text":"CurrentModule = AWSS3","category":"page"},{"location":"api/#S3-Interaction","page":"API","title":"S3 Interaction","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"s3_arn\ns3_get\ns3_get_file\ns3_get_meta\ns3_exists\ns3_delete\ns3_copy\ns3_create_bucket\ns3_put_cors\ns3_enable_versioning\ns3_put_tags\ns3_get_tags\ns3_delete_tags\ns3_delete_bucket\ns3_list_buckets\ns3_list_objects\ns3_list_keys\ns3_purge_versions\ns3_put\ns3_sign_url\ns3_nuke_bucket","category":"page"},{"location":"api/#AWSS3.s3_arn","page":"API","title":"AWSS3.s3_arn","text":"s3_arn(resource)\ns3_arn(bucket,path)\n\nAmazon Resource Name for S3 resource or bucket and path.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_get","page":"API","title":"AWSS3.s3_get","text":"s3_get([::AbstractAWSConfig], bucket, path; <keyword arguments>)\n\nGet Object from path in bucket.\n\nOptional Arguments\n\nversion=: version of object to get.\nretry=true: try again on \"NoSuchBucket\", \"NoSuchKey\"               (common if object was recently created).\nraw=false:  return response as Vector{UInt8}               (by default return type depends on Content-Type header).\nbyte_range=nothing:  given an iterator of (start_byte, end_byte) gets only   the range of bytes of the object from start_byte to end_byte.  For example,   byte_range=1:4 gets bytes 1 to 4 inclusive.  Arguments should use the Julia convention   of 1-based indexing.\nheader::Dict{String,String}: pass in an HTTP header to the request.\n\nAs an example of how to set custom HTTP headers, the below is equivalent to s3_get(aws, bucket, path; byte_range=range):\n\ns3_get(aws, bucket, path; headers=Dict{String,String}(\"Range\" => \"bytes=$(first(range)-1)-$(last(range)-1)\"))\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_get_file","page":"API","title":"AWSS3.s3_get_file","text":"s3_get_file([::AbstractAWSConfig], bucket, path, filename; [version=], kwargs...)\n\nLike s3_get but streams result directly to filename.  Keyword arguments accept are the same as those for s3_get.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_get_meta","page":"API","title":"AWSS3.s3_get_meta","text":"s3getmeta([::AbstractAWSConfig], bucket, path; [version=], kwargs...)\n\nHEAD Object\n\nRetrieves metadata from an object without returning the object itself.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_exists","page":"API","title":"AWSS3.s3_exists","text":"s3_exists([::AbstractAWSConfig], bucket, path; version=nothing)\n\nReturns a boolean whether an object exists at path in bucket.\n\nNote that the AWS API's support for object versioning is quite limited and this check will involve try catch logic if version is not nothing.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_delete","page":"API","title":"AWSS3.s3_delete","text":"s3_delete([::AbstractAWSConfig], bucket, path; [version=], kwargs...)\n\nDELETE Object\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_copy","page":"API","title":"AWSS3.s3_copy","text":"s3_copy([::AbstractAWSConfig], bucket, path; to_bucket=bucket, to_path=path, kwargs...)\n\nPUT Object - Copy\n\nOptional Arguments\n\nmetadata::Dict=; optional x-amz-meta- headers.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_create_bucket","page":"API","title":"AWSS3.s3_create_bucket","text":"s3_create_bucket([:AbstractAWSConfig], bucket; kwargs...)\n\nPUT Bucket\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_put_cors","page":"API","title":"AWSS3.s3_put_cors","text":"s3_put_cors([::AbstractAWSConfig], bucket, cors_config; kwargs...)\n\nPUT Bucket cors\n\ns3_put_cors(\"my_bucket\", \"\"\"\n    <?xml version=\"1.0\" encoding=\"UTF-8\"?>\n    <CORSConfiguration xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\">\n        <CORSRule>\n            <AllowedOrigin>http://my.domain.com</AllowedOrigin>\n            <AllowedOrigin>http://my.other.domain.com</AllowedOrigin>\n            <AllowedMethod>GET</AllowedMethod>\n            <AllowedMethod>HEAD</AllowedMethod>\n            <AllowedHeader>*</AllowedHeader>\n            <ExposeHeader>Content-Range</ExposeHeader>\n        </CORSRule>\n    </CORSConfiguration>\n\"\"\"\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_enable_versioning","page":"API","title":"AWSS3.s3_enable_versioning","text":"s3_enable_versioning([::AbstractAWSConfig], bucket; kwargs...)\n\nEnable versioning for bucket.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_put_tags","page":"API","title":"AWSS3.s3_put_tags","text":"s3_put_tags([::AbstractAWSConfig], bucket, [path,] tags::Dict; kwargs...)\n\nPUT tags on bucket or object (path).\n\nSee also tags= option on s3_put.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_get_tags","page":"API","title":"AWSS3.s3_get_tags","text":"s3_get_tags([::AbstractAWSConfig], bucket, [path]; kwargs...)\n\nGet tags from bucket or object (path).\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_delete_tags","page":"API","title":"AWSS3.s3_delete_tags","text":"s3_delete_tags([::AbstractAWSConfig], bucket, [path])\n\nDelete tags from bucket or object (path).\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_delete_bucket","page":"API","title":"AWSS3.s3_delete_bucket","text":"s3_delete_bucket([::AbstractAWSConfig], \"bucket\"; kwargs...)\n\nDELETE Bucket.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_list_buckets","page":"API","title":"AWSS3.s3_list_buckets","text":"s3_list_buckets([::AbstractAWSConfig]; kwargs...)\n\nList of all buckets owned by the sender of the request.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_list_objects","page":"API","title":"AWSS3.s3_list_objects","text":"s3_list_objects([::AbstractAWSConfig], bucket, [path_prefix]; delimiter=\"/\", max_items=1000, kwargs...)\n\nList Objects in bucket with optional path_prefix.\n\nReturns an iterator of Dicts with keys Key, LastModified, ETag, Size, Owner, StorageClass.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_list_keys","page":"API","title":"AWSS3.s3_list_keys","text":"s3_list_keys([::AbstractAWSConfig], bucket, [path_prefix]; kwargs...)\n\nLike s3_list_objects but returns object keys as Vector{String}.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_purge_versions","page":"API","title":"AWSS3.s3_purge_versions","text":"s3_purge_versions([::AbstractAWSConfig], bucket, [path [, pattern]]; kwargs...)\n\nDELETE all object versions except for the latest version.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_put","page":"API","title":"AWSS3.s3_put","text":"s3_put([::AbstractAWSConfig], bucket, path, data, data_type=\"\", encoding=\"\"; <keyword arguments>)\n\nPUT Object data at path in bucket.\n\nOptional Arguments\n\ndata_type=; Content-Type header.\nencoding=; Content-Encoding header.\nacl=; x-amz-acl header for setting access permissions with canned config.   See here.\nmetadata::Dict=; x-amz-meta- headers.\ntags::Dict=; x-amz-tagging- headers                (see also s3_put_tags and s3_get_tags).\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_sign_url","page":"API","title":"AWSS3.s3_sign_url","text":"s3_sign_url([::AbstractAWSConfig], bucket, path, [seconds=3600];\n            [verb=\"GET\"], [content_type=\"application/octet-stream\"],\n            [protocol=\"http\"], [signature_version=\"v4\"])\n\nCreate a pre-signed url for bucket and path (expires after for seconds).\n\nTo create an upload URL use verb=\"PUT\" and set content_type to match the type used in the Content-Type header of the PUT request.\n\nFor compatibility, the signature version 2 signing process can be used by setting signature_version=\"v2\" but it is recommended that the default version 4 is used.\n\nurl = s3_sign_url(\"my_bucket\", \"my_file.txt\"; verb=\"PUT\")\nRequests.put(URI(url), \"Hello!\")\n\nurl = s3_sign_url(\"my_bucket\", \"my_file.txt\";\n                  verb=\"PUT\", content_type=\"text/plain\")\n\nRequests.put(URI(url), \"Hello!\";\n             headers=Dict(\"Content-Type\" => \"text/plain\"))\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_nuke_bucket","page":"API","title":"AWSS3.s3_nuke_bucket","text":"s3_nuke_bucket(bucket_name)\n\nThis function is NOT exported on purpose. AWS does not officially support this type of action, although it is a very nice utility one this is not exported just as a safe measure against accidentally blowing up your bucket.\n\nwarning: Warning\nIt will delete all versions of objects in the given bucket and then the bucket itself.\n\n\n\n\n\n","category":"function"},{"location":"api/#S3Path","page":"API","title":"S3Path","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Note that S3Path implements the AbstractPath interface, some the FilePathsBase documentation for the interface here.","category":"page"},{"location":"api/","page":"API","title":"API","text":"S3Path\nstat\nmkdir\nread\nget_config","category":"page"},{"location":"api/#AWSS3.S3Path","page":"API","title":"AWSS3.S3Path","text":"S3Path()\nS3Path(str; version::Union{Nothing, AbstractString}=nothing, config::Union{Nothing, AWS.AbstractAWSConfig}=nothing)\n\nConstruct a new AWS S3 path type which should be of the form \"s3://<bucket>/prefix/to/my/object\".\n\nNOTES:\n\nDirectories are required to have a trailing / due to how S3 distinguishes files from folders, as internally they're just keys to objects.\nObjects p\"s3://bucket/a\" and p\"s3://bucket/a/b\" can co-exist. If both of these objects exist listing the keys for p\"s3://bucket/a\" returns [p\"s3://bucket/a\"] while p\"s3://bucket/a/\" returns [p\"s3://bucket/a/b\"].\nThe drive property will return \"s3://<bucket>\"\nOn top of the standard path properties (e.g., segments, root, drive, separator), S3Paths also support bucket and key properties for your convenience.\nIf version argument is nothing, will return latest version of object. Version can be provided via either kwarg version or as suffix \"?versionId=<object_version>\" of str, e.g., \"s3://<bucket>/prefix/to/my/object?versionId=<object_version>\".\nIf config is left at its default value of nothing, then the latest global_aws_config() will be used in any operations involving the path. To \"freeze\" the config at construction time, explicitly pass an AbstractAWSConfig to the config keyword argument.\nIf version argument is nothing, will return latest version of object.\n\n\n\n\n\n","category":"type"},{"location":"api/#Base.stat","page":"API","title":"Base.stat","text":"stat(fp::S3Path)\n\nReturn the status struct for the S3 path analogously to stat for local directories.\n\nNote that this cannot be used on a directory.  This is because S3 is a pure key-value store and internally does not have a concept of directories.  In some cases, a directory may actually be an empty file, in which case you should use s3_get_meta.\n\n\n\n\n\n","category":"function"},{"location":"api/#Base.Filesystem.mkdir","page":"API","title":"Base.Filesystem.mkdir","text":"mkdir(fp::S3Path; recursive=false, exist_ok=false)\n\nCreate an empty directory at the S3 path fp.  If recursive, this will create any previously non-existent directories which would contain fp.  An error will be thrown if an object exists at fp unless exist_ok.\n\nNote that empty directories in S3 are actually 0-byte objects with the naming convention of a directory.\n\nThis will not create a bucket.\n\n\n\n\n\n","category":"function"},{"location":"api/#Base.read","page":"API","title":"Base.read","text":"read(fp::S3Path; byte_range=nothing)\n\nFetch data from the S3 path as a Vector{UInt8}.  A subset of the object can be specified with byte_range which should be a contiguous integer range, e.g. 1:4.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.get_config","page":"API","title":"AWSS3.get_config","text":"get_config(fp::S3Path)\n\nReturns the AWS configuration used by the path fp.  This can be stored within the path itself, but if not it will be fetched with AWS.global_aws_config().\n\n\n\n\n\n","category":"function"},{"location":"api/#Internal","page":"API","title":"Internal","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"_s3_exists_dir\ns3_exists_versioned\ns3_exists_unversioned","category":"page"},{"location":"api/#AWSS3._s3_exists_dir","page":"API","title":"AWSS3._s3_exists_dir","text":"_s3_exists_dir(aws::AbstractAWSConfig, bucket, path)\n\nInternal, called by s3_exists.\n\nChecks whether the given directory exists.  This is a bit subtle because of how the AWS API handles empty directories.  Empty directories are really just 0-byte nodes which are named like directories, i.e. their name has a trailing \"/\".\n\nWhat this function does is, given a directory name dir/, check for all keys which are lexographically greater than dir..  The reason for this is that, if dir/ is a 0-byte node, checking for it directly will not reveal its existence due to some rather peculiar design choices on the part of the S3 developers.\n\nIn all such cases, if the directory exists it will be seen in the first item returned from S3.list_objects_v2: for empty directories this is because using start-after explicitly excludes dir. itself and dir/ is next; for directories with actual keys, it is guaranteed that the first contained key will start with the directory name.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_exists_versioned","page":"API","title":"AWSS3.s3_exists_versioned","text":"s3_exists_versioned([::AbstractAWSConfig], bucket, path, version)\n\nCheck if the version specified by version of the object in bucket bucket exists at path.\n\nNote that this function relies on error catching and may be less performant than s3_exists_unversioned which is preferred.  The reason for this is that support for versioning in the AWS API is very limited.\n\n\n\n\n\n","category":"function"},{"location":"api/#AWSS3.s3_exists_unversioned","page":"API","title":"AWSS3.s3_exists_unversioned","text":"s3_exists_unversioned([::AbstractAWSConfig], bucket, path)\n\nReturns a boolean whether an object exists at  path in bucket.\n\nSee s3_exists_versioned to check for specific versions.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = AWSS3","category":"page"},{"location":"#AWSS3.jl","page":"Home","title":"AWSS3.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AWSS3.jl is a Julia package for interacting with key-value data storage services AWS S3 and min.io.  It operates through HTTP calls to a REST API service.  It is based on the package AWS.jl which provides a direct wrapper to low-level API calls but provides a great deal of additional convenient functionality.","category":"page"},{"location":"#Quick-Start","page":"Home","title":"Quick Start","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using AWSS3\nusing AWS # for `global_aws_config`\n\naws = global_aws_config(; region=\"us-east-2\") # pass keyword arguments to change defaults\n\ns3_create_bucket(aws, \"my.bucket\")\ns3_enable_versioning(aws, \"my.bucket\")\n\ns3_put(aws, \"my.bucket\", \"key\", \"Hello!\")\nprintln(s3_get(aws, \"my.bucket\", \"key\"))  # prints \"Hello!\"\nprintln(s3_get(aws, \"my.bucket\", \"key\", byte_range=1:2))  # prints only \"He\"","category":"page"},{"location":"#S3Path","page":"Home","title":"S3Path","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package provides the S3Path object which implements the FilePathsBase interface, thus providing a filesystem-like abstraction for interacting with S3.  In particular, this allows for interacting with S3 using the filesystem interface provided by Julia's Base.  This makes it possible to (mostly) write code which works the same way for S3 as it does for the local filesystem.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> using AWSS3, AWS, FilePathsBase;\n\n# global_aws_config() is also the default if no `config` argument is passed\njulia> p = S3Path(\"s3://bucket-name/dir1/\", config=global_aws_config());\n\njulia> readdir(p)\n1-element Vector{SubString{String}}:\n \"demo.txt\"\n\njulia> file = joinpath(p, \"demo.txt\")\np\"s3://bucket-name/dir1/demo.txt\"\n\njulia> stat(file)\nStatus(\n  device = 0,\n  inode = 0,\n  mode = -rw-rw-rw-,\n  nlink = 0,\n  uid = 1000 (username),\n  gid = 1000 (username),\n  rdev = 0,\n  size = 34 (34.0),\n  blksize = 4096 (4.0K),\n  blocks = 1,\n  mtime = 2021-01-30T18:53:02,\n  ctime = 2021-01-30T18:53:02,\n)\n\njulia> String(read(file))  # fetch the file into memory\n\"this is a file for testing S3Path\\n\"\n\njulia> String(read(file, byte_range=1:4))  # fetch a specific byte range of the file\n\"this\"\n\njulia> rm(file)  # delete the file\nUInt8[]","category":"page"},{"location":"","page":"Home","title":"Home","text":"warning: Warning\nS3 is a pure key-value store, NOT a filesystem.  Therefore, though S3 has, over time, gained features which oftne mimic a filesystem interface, in some cases it can behave very differently.  In particular \"empty directories\" are, in actuality, 0-byte files and can have some unexpected behavior, e.g. there is no stat(dir) like in a true filesystem.","category":"page"},{"location":"#Min.io","page":"Home","title":"Min.io","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Min.io is fully compatible with the S3 API and therefore this package can be used to interact with it.  To use Min.io requires a dedicated AWS configuration object, see the Minio.jl package.  This package also contains some convenience functions for easily setting up a server for experimentation and testing with the min.io/S3 interface.","category":"page"}]
}
