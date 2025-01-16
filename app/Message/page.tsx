import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function AlignItemsList() {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 1080,
        bgcolor: "background.paper",
        marginInline: "auto",
      }}
    >
      {demo.map((item) => (
        <>
          <ListItem alignItems="flex-start" key={item.id}>
            <ListItemAvatar>
            <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  {item.message}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
      ))}
    </List>
  );
}

const demo = [
  {
    id: 1,
    name: "John Doe",
    message: "Hello, how are you?",
  },
  {
    id: 2,
    name: "Jane Doe",
    message: "I'm fine, thank you!",
  },
  {
    id: 3,
    name: "John Smith",
    message: "What's up?",
  },
  {
    id: 4,
    name: "Jane Smith",
    message: "Nothing much, just chilling.",
  },
  {
    id: 5,
    name: "John Doe",
    message: "Hello, how are you?",
  },
  {
    id: 6,
    name: "Jane Doe",
    message: "I'm fine, thank you!",
  },
  {
    id: 7,
    name: "John Smith",
    message: "What's up?",
  },
  {
    id: 8,
    name: "Jane Smith",
    message: "Nothing much, just chilling.",
  },
  {
    id: 9,
    name: "John Doe",
    message: "Hello, how are you?",
  },
];
