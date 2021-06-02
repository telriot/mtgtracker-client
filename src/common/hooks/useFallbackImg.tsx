import React from 'react'

const useFallbackImg = (src: string, fallback:string) => 
{
    const [imgSrc, setImgSrc] = React.useState(src)
    React.useEffect(() => { setImgSrc(src) }, [src])
    const handleError = () => setImgSrc(fallback)

    return { imgSrc, setImgSrc, handleError }
}

export default useFallbackImg