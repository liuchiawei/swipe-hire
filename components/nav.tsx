"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        color: "#030c26",
        backgroundColor: "#f0f0f0",
        padding: "1rem",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <h1 className="text-2xl font-bold text-center py-6">SwipeHire</h1>
      <Divider />
      <List>
        <Link href="/Discover">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="line-md:compass-loop" width="24" height="24" />
              </ListItemIcon>
              <ListItemText primary="Discover" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/Swipe">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="line-md:watch-loop" width="24" height="24" />
              </ListItemIcon>
              <ListItemText primary="Swipe" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/Collection">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Icon
                  icon="line-md:star-pulsating-loop"
                  width="24"
                  height="24"
                />
              </ListItemIcon>
              <ListItemText primary="Collection" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/Message">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="line-md:email" width="24" height="24" />
              </ListItemIcon>
              <ListItemText primary="Message" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="/MyPage">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="line-md:account" width="24" height="24" />
              </ListItemIcon>
              <ListItemText primary="MyPage" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <Icon icon="line-md:logout" width="24" height="24" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 text-white drop-shadow-md bg-black/10 rounded-md">
        <Button variant="text" color="inherit" onClick={toggleDrawer(true)}>
          {open ? (
            <Icon
              icon="line-md:menu-to-close-alt-transition"
              width="24"
              height="24"
            />
          ) : (
            <Icon
              icon="line-md:close-to-menu-alt-transition"
              width="24"
              height="24"
            />
          )}
        </Button>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
