import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Parallax } from 'react-parallax';
import { Link, useHistory } from 'react-router-dom';
import { Label, Icon, Divider } from 'semantic-ui-react';
import Slider from 'src/Components/Slider';
import BackButton from 'src/Components/BackButton/BackButton';
import SocialSharing from 'src/Components/SocialSharing';
import './Articles.less';

const Articles = () => {
	const history = useHistory();
	const {
		contenuBoody,
		debutTime,
		finTime,
		image,
		tags,
		titre,
		// eslint-disable-next-line camelcase
		slider_elements,
	} = history.location.state;

	const Tags = typeof tags === 'string' ? JSON.parse(tags) : tags;

	const [shareModalIsOpen, openShareModal] = useState(false);

	return (
		<div className="offer-details" id="offer">
			<SocialSharing open={shareModalIsOpen} setOpen={openShareModal} />
			<Parallax strength={200}>
				{slider_elements.length < 1 && <img src={image} alt="" className="fallback-img" />}

				<Slider className="slider" id="offers">
					{slider_elements.map((x) => (
						<img src={x.content} alt="" style={{ height: '60vh', objectFit: 'cover', width: '100%' }} />
					))}
				</Slider>

				<div className="offer-details-header">
					{/* <BackButton text={titre} /> */}
					<BackButton text={titre} />

					<Divider hidden />
					<Divider hidden />
					<p>
						{dayjs(debutTime, 'DD/MM/YYYY').format('D MMM')} -{' '}
						{dayjs(finTime, 'DD/MM/YYYY').format('D MMM')}
					</p>
					<div className="offer-details-tags">
						{Tags &&
							Tags.map((tag) => (
								<Link to="/">
									<Label key={tag}>{tag}</Label>
								</Link>
							))}
					</div>
					<div className="share-button">
						<Label onClick={() => openShareModal(true)} color="blue">
							<Icon name="share" />
							PARTAGER
						</Label>
					</div>
				</div>
				<div className="parallax-content" />
			</Parallax>

			{/* eslint-disable-next-line react/no-danger */}
			<div className="description" dangerouslySetInnerHTML={{ __html: contenuBoody }} />
		</div>
	);
};

export default Articles;
