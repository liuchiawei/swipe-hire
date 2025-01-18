"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
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

  const navStyle: { color: string; size: number } = {
    color: "#565656",
    size: 24,
  };

  const mainList: { icon: string; text: string }[] = [
    {
      icon: "line-md:compass-loop",
      text: "Discover",
    },
    {
      icon: "line-md:watch-loop",
      text: "Swipe",
    },
    {
      icon: "line-md:star-pulsating-loop",
      text: "Collection",
    },
    {
      icon: "line-md:email",
      text: "Message",
    },
  ];

  const subList: { icon: string; text: string }[] = [
    {
      icon: "line-md:account",
      text: "MyPage",
    },
    {
      icon: "line-md:logout",
      text: "Logout",
    },
  ];

  const DrawerList = (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "1rem",
        color: navStyle.color,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <h1 className="text-2xl font-bold text-center py-6">SwipeHire</h1>
      <Divider sx={{ borderColor: navStyle.color }} />
      <List>
        {mainList.map((item) => (
          <Link href={`/${item.text}`} key={item.text}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Icon
                    icon={item.icon}
                    width={navStyle.size}
                    height={navStyle.size}
                  />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={{ borderColor: navStyle.color }} />
      <List>
        {subList.map((item) => (
          <Link href={`/${item.text}`} key={item.text}>
            <ListItem>
              <ListItemButton>
                <ListItemIcon sx={{ color: "inherit" }}>
                  <Icon
                    icon={item.icon}
                    width={navStyle.size}
                    height={navStyle.size}
                  />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 text-white drop-shadow-md bg-black/10 rounded-full overflow-hidden">
        <Button variant="text" color="inherit" onClick={toggleDrawer(true)}>
          {open ? (
            <Icon
              icon="line-md:menu-to-close-alt-transition"
              width={navStyle.size}
              height={navStyle.size}
            />
          ) : (
            <Icon
              icon="line-md:close-to-menu-alt-transition"
              width={navStyle.size}
              height={navStyle.size}
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
