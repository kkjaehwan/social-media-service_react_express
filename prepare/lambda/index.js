const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // tossknot
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/12312312_sample.png

  console.log(Bucket, Key);

  const filename = Key.split('/')[Key.split('/').length - 1]; // 12312312_sample.png
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); // png
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext;
  
  console.log('filename', filename, 'ext', ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise();
    console.log('original', s3Object.Body.length); // check imange size 
    const resizedImage = await sharp(s3Object.Body)
      .resize(500, 500, { fit: 'inside' })
      .withMetadata() 
      .toFormat(requiredFormat)
      .toBuffer();
    await s3.putObject({
      Bucket,
      Key: `thumb/${filename}`,
      Body: resizedImage,
    }).promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error)
    return callback(error);
  }
}