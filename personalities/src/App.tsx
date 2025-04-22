import { useState, useEffect } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography, Avatar, Box } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props: { expand: boolean, onClick: () => void }) => {
  const { expand, onClick } = props;
  return (
    <IconButton onClick={onClick} aria-expanded={expand} aria-label="show more">
      <ExpandMoreIcon />
    </IconButton>
  );
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: 'rotate(0deg)',
  '&.expanded': {
    transform: 'rotate(180deg)',
  },
}));

export default function Gallery() {
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/cayanan/personalities')
      .then((response) => response.json())
      .then((data) => {
        setPersonalities(data);
      })
      .catch((error) => {
        console.error('There was an error fetching the personalities!', error);
      });
  }, []);

  if (personalities.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h4">No data</Typography>
      </Box>
    );
  }

  const avenger = personalities[index];

  const handleBackClick = () => {
    setIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : personalities.length - 1));
  };

  const handleNextClick = () => {
    setIndex((prevIndex) => (prevIndex < personalities.length - 1 ? prevIndex + 1 : 0));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh">
      <Box width="100%" maxWidth={600} padding={2}>
        <Typography variant="h4" gutterBottom align="center">
          Personalities
        </Typography>
        <Card className="avenger-card">
          <CardHeader
            avatar={<Avatar>FS</Avatar>}
            title={<Typography>Frunez Shyna D. Cayanan</Typography>}
            subheader={<Typography variant="body2">C-PEITEL3</Typography>}
          />
          <CardMedia
            component="img"
            height="350"
            image={avenger.url}
            alt={avenger.alt}
          />
          <CardContent>
            <Typography variant="h4">
              {avenger.name}
            </Typography>
            <Typography className="avenger-number" variant="body1">
              Avenger {index + 1} of {personalities.length}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary" className="show-details-text">
                {expanded ? 'Hide' : 'Show'} details
              </Typography>
              <ExpandMore expand={expanded} onClick={handleExpandClick} />
            </Box>
          </CardContent>
          <CardActions disableSpacing>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2">
                  {avenger.description}
                </Typography>
              </CardContent>
            </Collapse>
          </CardActions>
        </Card>
        <Box display="flex" justifyContent="center" gap={3} marginTop={2}>
          <IconButton
            className="nav-button"
            onClick={handleBackClick}
            aria-label="back"
          >
            <NavigateBefore />
          </IconButton>
          <IconButton
            className="nav-button"
            onClick={handleNextClick}
            aria-label="next"
          >
            <NavigateNext />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
