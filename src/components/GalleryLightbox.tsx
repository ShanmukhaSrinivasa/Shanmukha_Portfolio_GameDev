import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/captions.css';

interface GalleryLightboxProps {
  slides: { src: string; caption: string }[];
  index: number;
  onClose: () => void;
}

/** Full-screen, captioned image gallery. Loaded on demand from cards. */
const GalleryLightbox = ({ slides, index, onClose }: GalleryLightboxProps) => (
  <Lightbox
    open={index >= 0}
    index={Math.max(index, 0)}
    close={onClose}
    slides={slides.map((s) => ({ src: s.src, alt: s.caption, description: s.caption }))}
    plugins={[Zoom, Counter, Captions]}
    captions={{ descriptionTextAlign: 'center' }}
    controller={{ closeOnBackdropClick: true }}
    styles={{ container: { backgroundColor: 'rgba(5, 8, 15, 0.96)' } }}
  />
);

export default GalleryLightbox;
