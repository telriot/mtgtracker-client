//  ======================================== IMPORTS
import React from 'react'
import cardBack from 'assets/images/card-back.jpg'
import useFallbackImg from 'common/hooks/useFallbackImg'
//  ======================================== COMPONENT
const CARD_SIZE = { height: 88, width: 63 };

export interface CardImageProps {
	zoom?: number;
	src: string;
	alt: string;
	className?: string;
}

const CardImage : React.FC<CardImageProps>= ({ zoom = 4, src, alt, className = '' }) => {
	//  ======================================== HOOKS
    const { imgSrc, handleError } = useFallbackImg(src, cardBack)

	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			className={className}
			style={{
				height: `${CARD_SIZE.height * zoom}px`,
				width: `${CARD_SIZE.width * zoom}px`
			}}>
			<img className='h-100 w-100' src={imgSrc} alt={alt} onError={handleError} />
		</div>
	);
};

//  ======================================== EXPORTS
export default CardImage;
//  ========================================
