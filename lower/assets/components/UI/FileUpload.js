import React from 'react';
import { ListItemIcon, ListItemText, List, ListItem, ListItemAvatar, ListItemButton } from '@mui/material';
import { InsertDriveFile } from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';

export const FileUpload = ({ t, control, name, saved = [] }) => {
    const availableFormats = ['jpg', 'jpeg', 'pdf', 'png', 'doc', 'doc', 'docx', 'odt'];
    const availableFormatsText = availableFormats.join(', ');

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={[]}
            render={({ field: { onChange, onBlur, value = [] } }) => {
                return <>
                    <Dropzone onDrop={onChange}>
                        {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                                <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} name={name} onBlur={onBlur} />
                                    <div className="mb-3">
                                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                                    </div>
                                    <h4>{t('Drop files here or click to upload')}</h4>
                                    <h6>{t('Available formats')} ({availableFormatsText})</h6>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                    <List>
                        {value.map((f, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <InsertDriveFile />
                                </ListItemIcon>
                                <ListItemText primary={f.name} secondary={f.size} />
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        {saved.map((v, k) => (
                            <ListItem
                                key={`${v.substring(0, 4)}-${k}`}
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <img
                                            data-dz-thumbnail=""
                                            height="80"
                                            className="avatar-sm rounded bg-light"
                                            alt={v}
                                            src={`${process.env.REACT_APP_UPLOAD_URL}/${v}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={`avatext-${v.substring(0, 8)}`} primary={v} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </>
            }}
        />)
}

export default FileUpload;