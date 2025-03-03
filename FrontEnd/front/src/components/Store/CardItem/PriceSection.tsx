import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
// PriceSection Component
interface PriceSectionProps {
  isFree: boolean;
  price: number;
  discountedPrice?: number;
}

const PriceSection: React.FC<PriceSectionProps> = ({
  isFree,
  price,
  discountedPrice,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {isFree && (
        <Typography
          sx={{
            color: '#1f1f1f',
            display: 'flex',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            height: 30,
            mt: '2px',
            pl: { sm: 0.5, md: 1.2 },
          }}
        >
          Free
        </Typography>
      )}
      {discountedPrice && discountedPrice > 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isFree && (
            <Typography sx={{ fontSize: 20, ml: { sm: 0.5, md: 1.2 } }}>
              ${discountedPrice}
            </Typography>
          )}
          <Typography
            sx={{
              fontSize: isFree ? 20 : 18,
              textDecoration: 'line-through',
              color: '#9c9c9c',
              mt: isFree ? 0.5 : isMobile ? 0.5 : 0.4,
              ml: isMobile ? 0.5 : 1,
            }}
          >
            ${price}
          </Typography>
        </Box>
      ) : (
        <Typography
          sx={{
            fontSize: isFree ? 20 : 22,
            textDecoration: isFree ? 'line-through' : 'none',
            fontWeight: isFree ? 'normal' : 'normal',
            color: isFree ? '#9c9c9c' : '#1f1f1f',
            mt: 0.2,
            pl: 0.5,
          }}
        >
          ${price}
        </Typography>
      )}
    </Box>
  );
};

export default PriceSection;
