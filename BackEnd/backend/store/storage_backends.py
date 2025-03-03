from storages.backends.s3boto3 import S3Boto3Storage

class AttachmentS3Boto3Storage(S3Boto3Storage):
    """
    모든 업로드된 파일에 대해 Content-Disposition을 'attachment'로 설정하는 커스텀 스토리지 백엔드.
    """
    object_parameters = {
        'ContentDisposition': 'attachment',
    }
