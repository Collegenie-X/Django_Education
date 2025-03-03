import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import Image from 'next/image'; // Assuming you are using Next.js

interface ImageDialogProps {
  open: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  open,
  onClose,
  imageUrl,
}) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ width: 470, mx: 'auto' }}>
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',

          alignItems: 'center',
          p: 2,
        }}
      >
        <Image
          src={imageUrl}
          alt="Preview"
          width={470}
          height={560}
          objectFit="cover"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
