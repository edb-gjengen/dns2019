import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Meta = props => {
    const { title, description, article, pathname: url, image: imageObj } = props
    const image = imageObj && imageObj.localFile && imageObj.localFile.url
    return (
        <Helmet
            title={title}
            titleTemplate="%s | Det Norske Studentersamfund"
            defaultTitle="Det Norske Studentersamfund"
        >
            {description && <meta name="description" content={description} />}
            {image && <meta name="image" content={image} />}
            {url && <meta property="og:url" content={url} />}
            {(article ? true : null) && (
                <meta property="og:type" content="article" />
            )}
            {title && <meta property="og:title" content={title} />}
            {description && (
                <meta property="og:description" content={description} />
            )}
            {image && <meta property="og:image" content={image} />}
        </Helmet>
    )
}

export default Meta

Meta.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    pathname: PropTypes.string,
    article: PropTypes.bool,
}

Meta.defaultProps = {
    title: null,
    description: null,
    image: null,
    pathname: null,
    article: false,
}
