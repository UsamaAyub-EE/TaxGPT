'use client'

import { Box, Divider, List, ListItemButton, ListItemText } from '@mui/material'
import { InputFileUpload } from '@/shared/components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/shared/axiosConfig'
axios.defaults.baseURL = 'http://localhost:8000'

export default function Home() {
  const [files, setFiles] = useState([])
  const router = useRouter()

  const fetchFiles = () => {
    axiosInstance
      .get('/file_uploads/files/')
      .then((response) => {
        setFiles(response.data)
      })
      .catch((error) => {
        console.error(error)
        if (error.response.status === 401) {
          router.push('/sign-in')
        }
      })
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)

    axiosInstance
      .post('/file_uploads/upload/', formData)
      .then((response) => {
        console.log(response)
        fetchFiles()
      })
      .catch((error) => {
        console.error(error)
        if (error.response.status === 401) {
          router.push('/sign-in')
        }
      })
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) router.push('/sign-in')
  }, [])

  const handleFileClick = (fileId, fileName) => {
    axiosInstance
      .get(`/file_uploads/files/${fileId}/`, {
        responseType: 'blob'
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw'
      }}>
      <InputFileUpload handleFileUpload={handleFileUpload} />

      <Divider variant="fullWidth" />

      <List>
        {files.map((file, index) => (
          <ListItemButton key={index} onClick={() => handleFileClick(file.id, file.name)}>
            <ListItemText primary={file.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}
