import React from 'react'
import Helmet from 'react-helmet';

/**
 * MetaData component for setting the title of the document.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the document.
 * @returns {JSX.Element} The rendered MetaData component.
 */
const MetaData = ({title}) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default MetaData