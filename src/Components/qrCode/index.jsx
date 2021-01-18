import React from 'react';
import PropTypes from 'prop-types';

const QrCodeComponent = ({ qrCodeImg }) => (
	<>
		<svg
			className="qr-counter"
			xmlns="http://www.w3.org/2000/svg"
			width="262.703"
			height="262.703"
			viewBox="0 0 262.703 262.703"
		>
			<g id="Group_736" data-name="Group 736" transform="translate(-361.799 -846.799)">
				<g id="Group_727" data-name="Group 727" transform="translate(361.799 846.799)">
					<g id="qr-code" transform="translate(0 0)">
						<path
							id="Path_17"
							data-name="Path 17"
							d="M414.465,0H377.7a7.7,7.7,0,1,0,0,15.393h36.768a13.017,13.017,0,0,1,13,13V65.163a7.7,7.7,0,1,0,15.392,0V28.394A28.427,28.427,0,0,0,414.465,0Z"
							transform="translate(-180.157 0)"
							fill="#fff"
						/>
						<path
							id="Path_18"
							data-name="Path 18"
							d="M7.7,72.859a7.7,7.7,0,0,0,7.7-7.7V28.394a13.017,13.017,0,0,1,13-13H65.163A7.7,7.7,0,0,0,65.163,0H28.4A28.427,28.427,0,0,0,0,28.394V65.163a7.7,7.7,0,0,0,7.7,7.7Z"
							transform="translate(0 0)"
							fill="#fff"
						/>
						<path
							id="Path_19"
							data-name="Path 19"
							d="M65.163,427.467H28.4a13.017,13.017,0,0,1-13-13V377.7A7.7,7.7,0,1,0,0,377.7v36.768A28.427,28.427,0,0,0,28.4,442.859H65.163a7.7,7.7,0,1,0,0-15.392Z"
							transform="translate(0 -180.156)"
							fill="#fff"
						/>
						<path
							id="Path_20"
							data-name="Path 20"
							d="M435.163,370a7.7,7.7,0,0,0-7.7,7.7v36.768a13.017,13.017,0,0,1-13,13H377.7a7.7,7.7,0,1,0,0,15.392h36.768a28.426,28.426,0,0,0,28.395-28.395V377.7A7.7,7.7,0,0,0,435.163,370Z"
							transform="translate(-180.157 -180.156)"
							fill="#fff"
						/>
					</g>
				</g>
			</g>
		</svg>

		<img src={qrCodeImg} alt="qrCode" className="qrcode" />
	</>
);

QrCodeComponent.propTypes = {
	qrCodeImg: PropTypes.string,
};
QrCodeComponent.defaultProps = {
	qrCodeImg: null,
};

export default QrCodeComponent;
