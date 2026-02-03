import { render, screen, fireEvent } from '@testing-library/react';
import ImageModal from '../ImageModal';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, priority, ...props }: any) {
    return <img src={src} alt={alt} data-priority={priority} {...props} />;
  };
});

describe('ImageModal', () => {
  const mockProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<ImageModal {...mockProps} />);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    expect(screen.getByText('Test image')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<ImageModal {...mockProps} isOpen={false} />);
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<ImageModal {...mockProps} onClose={onCloseMock} />);
    
    const closeButton = screen.getByLabelText('Close image preview');
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', () => {
    const onCloseMock = jest.fn();
    render(<ImageModal {...mockProps} onClose={onCloseMock} />);
    
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when image container is clicked', () => {
    const onCloseMock = jest.fn();
    render(<ImageModal {...mockProps} onClose={onCloseMock} />);
    
    const image = screen.getByAltText('Test image');
    fireEvent.click(image.parentElement!);
    
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('calls onClose when Escape key is pressed', () => {
    const onCloseMock = jest.fn();
    render(<ImageModal {...mockProps} onClose={onCloseMock} />);
    
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<ImageModal {...mockProps} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'image-modal-title');
    
    const title = screen.getByText('Test image');
    expect(title).toHaveAttribute('id', 'image-modal-title');
  });
});