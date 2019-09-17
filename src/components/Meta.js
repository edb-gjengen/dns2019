import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, image, pathname, article }) => {
    const imageUrl = image && image.localFile && image.localFile.url
    const meta = {
        title: title,
        description: description,
        image: imageUrl,
        url: pathname,
    }
    return (
        <Helmet
            title={meta.title}
            titleTemplate="%s | Det Norske Studentersamfund"
            defaultTitle="Det Norske Studentersamfund"
        >
            {meta.description && <meta name="description" content={meta.description} />}
            {meta.image && <meta name="image" content={meta.image} />}
            {meta.url && <meta property="og:url" content={meta.url} />}
            {(article ? true : null) && (
                <meta property="og:type" content="article" />
            )}
            {meta.title && <meta property="og:title" content={meta.title} />}
            {meta.description && (
                <meta property="og:description" content={meta.description} />
            )}
            {meta.image && <meta property="og:image" content={meta.image} />}
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
