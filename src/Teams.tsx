import React from 'react'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ChatIcon from '@mui/icons-material/Chat'
import GroupIcon from '@mui/icons-material/Group'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

export default function Teams() {
  return (
    <Grid container spacing={2}>
      <Grid size={2}>
        <Menu />
      </Grid>
      <Grid size={4}>
        <ChannelList />
      </Grid>
      <Grid size={6}>
        <MessageList />
      </Grid>
    </Grid>
  )
  function Menu() {
    return (
      <div>
        <Stack textAlign='center' spacing={2}>
          <Stack>
            <div>
              <NotificationsIcon />
            </div>
            <div>アクティビティ</div>
          </Stack>
          <Stack>
            <div>
              <ChatIcon />
            </div>
            <div>チャット</div>
          </Stack>
          <Stack>
            <div>
              <GroupIcon />
            </div>
            <div>チーム</div>
          </Stack>
        </Stack>
      </div>
    )
  }

  function ChannelList() {
    const channels = ['一般', '担任連絡', '就職チャンネル']
    return (
      <List>
        {channels.map((channel) => (
          <ListItem key={channel}>
            <ListItemButton>
              <ListItemText primary={channel} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    )
  }

  function MessageList() {
    const messages = ['hoge hoge', 'fuga fuga', 'piyo piyo']
    return (
      <Stack spacing={2}>
        {messages.map((message) => (
          <Card key={message}>
            <CardContent>{message}</CardContent>
          </Card>
        ))}
        <Card></Card>
      </Stack>
    )
  }
}
