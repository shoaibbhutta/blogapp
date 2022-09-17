import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "10px",
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));
interface PreviewMedediaProps {
  urls: FileList | null;
  setUrls: React.Dispatch<React.SetStateAction<FileList | null>>;
}
const PreviewMededia = ({
  urls,
  setUrls,
}: PreviewMedediaProps): JSX.Element => {
  const classes = useStyles();

  const handleDeleteImage = (key: string) => {
    if (urls && urls.length > 1) {
      const list = { ...urls };
      // console.log(list);
      delete list[parseInt(key)];
      setUrls(list);
      // console.log("deleted ke===============>", list);
    } else {
      setUrls(null);
    }
    // // list.splice(index, 1);
  };
  return (
    <Box>
      {urls &&
        Object.keys(urls).length !== 0 &&
        Object.keys(urls).map((key, i) => (
          <Card className={classes.root} key={i}>
            <CardMedia
              className={classes.media}
              image={URL.createObjectURL(urls[parseInt(key)])}
            />
            <IconButton
              onClick={() => handleDeleteImage(key)}
              className={classes.close}
            >
              <HighlightOffIcon />
            </IconButton>
          </Card>
        ))}
    </Box>
  );
};

export default PreviewMededia;
