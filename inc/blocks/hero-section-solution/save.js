import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { description, buttonText, imageUrl, link } = attributes;

  return (
    <div {...useBlockProps.save()}>
      <div className="hero-content">
        {imageUrl && (
          <div className="hero-image">
            <img src={imageUrl} alt="" />
          </div>
        )}
        <div className="hero-text">
          <RichText.Content
            tagName="div"
            className="hero-description"
            value={description}
          />
          {buttonText && link && (
            <a href={link} className="hero-button">
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
