import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react';

// Register the image resize module
Quill.register('modules/imageResize', ImageResize);

// Register alignment styles
const AlignStyle = Quill.import('attributors/style/align');
Quill.register(AlignStyle, true); 

