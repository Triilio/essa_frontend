import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip, useDisclosure } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { DownloadIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import { AuthApiProvider } from '../../providers/api.provider';
import AppContext from '../../utils/context';
import download from 'js-file-download';
import axios from 'axios';


function DownloadDocument({ docid, type, callback }: { docid: string, type : string, callback: () => void }) {
  
  const appContext = useContext(AppContext);
  var apiProvider = new AuthApiProvider();

const s = () => 
apiProvider.getDocument({type:"doc", id:docid}).then((data)=>{
  console.log("downloaded ", data );
}).catch((error)=>{
});

const downloadFile = () => {
  axios.get( `${apiProvider.baseurl}/orders/download?id=${docid}&type=${type}`,
)
    .then(resp => {
           download(resp.data, docid);
    });
}

  return (
    <>
        <Tooltip label="Download Document">
      <Button m={1} onClick={() => {downloadFile()}} leftIcon={<DownloadIcon />} colorScheme='green' size='sm' />
          </Tooltip>
    </>
  );
}

export default DownloadDocument; 