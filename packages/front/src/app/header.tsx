"use client";

import { useUser } from "@auth0/nextjs-auth0";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineAccountCircle } from "react-icons/md";

export const Header = () => {
  const pathName = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const isAccount = pathName.includes("/account");
  const isNotes = pathName.includes("/notes");
  const onClickToAccount = () => {
    router.push("/account");
  };
  if (!user) {
    return <HeaderForNotLogin />;
  }
  return (
    <AppBar position="fixed" sx={{ bgcolor: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 0, minHeight: "24px !important" }}>
          <Typography variant="h6" component="h1">
            F
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            {isAccount && <Typography>アカウント</Typography>}
            {isNotes && <Typography>ノート管理</Typography>}
          </Box>
          <IconButton onClick={onClickToAccount} sx={{ color: "black" }}>
            <MdOutlineAccountCircle size={24} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const HeaderForNotLogin = () => {
  const router = useRouter();

  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: "white", color: "black", boxShadow: 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            py: 0,
            justifyContent: "space-between",
            minHeight: "24px !important",
          }}
        >
          <Typography variant="h6" component="h1">
            F
          </Typography>
          <Box>
            <IconButton
              sx={{ color: "primary.main" }}
              onClick={() => router.push("/login")}
            >
              <Typography variant="button">登録/ログイン</Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
