import axios from 'axios';
import React, { useRef, useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import Rodal from 'rodal';
import { backendUrl } from '../../../config/constants';
import { FcApproval } from 'react-icons/fc';
import { Documents } from '../../pages/Apply';

function CertOfOrigin({ doc, app_id, setDocuments }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const ref = useRef<HTMLInputElement | null>(null);

  function showModal() {
    return setVisible(true);
  }
  function closeModal() {
    ref.current!.value = '';
    return setVisible(false);
  }
  const [image, setImage] = useState<{ url: string | null; file: File | null }>(
    { url: null, file: null }
  );

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      let url = URL.createObjectURL(file);
      setImage({ url, file });
      showModal();
    }
  };

  const upload = async () => {
    setLoading(true);
    const form = new FormData();

    form.append('file', image.file!);
    form.append('scholarship_application_id', app_id);
    form.append('image_for', 'certificate_of_origin');
    try {
      let res = await axios.post(backendUrl + '/api/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDocuments((prev) => {
        let data: Documents = { ...prev };
        data.certificateOfOrigin = res.data.url;
        return { ...data };
      });
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log(error);

      alert('something went wrong, try again');
      setLoading(false);
    }
  };

  return (
    <>
      <label htmlFor='certificateOfOrigin'>
        Upload Your Local Government Certificate Of Origin
      </label>
      <div className='border rounded w-full py-2 px-2 mt-2 mb-5'>
        <input
          ref={ref}
          type='file'
          accept='image/*'
          id='certificate_of_origin'
          onChange={handleImageSelect}
          className='hidden'
          required
          name='certificate_of_origin'
        />

        <label
          htmlFor='certificate_of_origin'
          className='text-[#95A48C] flex items-center gap-2 font-medium'
        >
          {doc ? (
            <div className='text-green-500 text-2xl'>
              <FcApproval />
            </div>
          ) : (
            <MdFileUpload size={25} />
          )}
          <span>{doc ? 'Image saved' : 'jpeg, png, jpg'}</span>
        </label>
      </div>
      <Rodal
        height={350}
        closeMaskOnClick={false}
        closeOnEsc={false}
        visible={visible}
        onClose={closeModal}
        showCloseButton={false}
      >
        <div>Is this the image correct?</div>
        <div className='p-4 h-[80%]'>
          <img
            className='w-full h-full object-contain'
            src={String(image.url)}
            alt='preview'
          />
        </div>
        <div className='flex justify-between gap-5'>
          <button
            className='hover:bg-red-500 p-2 hover:text-white bg-gray-50 rounded-md'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            onClick={upload}
            className='bg-green-500 p-2 rounded-md text-white font-semibold'
          >
            {loading ? 'loading ...' : 'Yes, proceed'}
          </button>
        </div>
      </Rodal>
    </>
  );
}

export default CertOfOrigin;
