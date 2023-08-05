import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import ContainerWrap from '../atoms/ContainerWrap';
import PersonalDetailsForm from '../components/Apply/PersonalDetailsForm';
import axios from 'axios';
import { backendUrl } from '../../config/constants';
import 'rodal/lib/rodal.css';
import CertOfOrigin from '../components/Apply/CertOfOrigin';
import BirthCertUpload from '../components/Apply/BirthCertUpload';
import AdmissionLetterUpload from '../components/Apply/AdmissionLetterUpload';
import FeeScheduleUpload from '../components/Apply/FeeScheduleUpload';
import FeeReceipt from '../components/Apply/FeeReceiptUpload';
import AttestationLetterUpload from '../components/Apply/AttestationLetterUpload';
import FullPictureUpload from '../components/Apply/FullPictureUpload';

export type Documents = {
  certificateOfOrigin: string | null;
  birthCertificate: string | null;
  admissionLetter: string | null;
  feeSchedule: string | null;
  letterOfAttestation: string | null;
  feeReceipt: string | null;
  picture: string | null;
};

export default function Apply() {
  const [page, setPage] = useState('page-1');
  const [loading, setLoading] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

  const [documents, setDocuments] = useState<Documents>({
    certificateOfOrigin: null,
    birthCertificate: null,
    admissionLetter: null,
    feeSchedule: null,
    letterOfAttestation: null,
    feeReceipt: null,
    picture: null,
  });

  // form one
  async function handlePersonalFormSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      formOfDisability,
      programmeOfStudy,
      lga,
      courseOfStudy,
      email,
    } = e.target;

    const data = {
      firstname: firstName.value,
      lastname: lastName.value,
      dob: dateOfBirth.value,
      gender: gender.value,
      form_of_disability: formOfDisability.value,
      programme_of_study: programmeOfStudy.value,
      lga: lga.value,
      email: email.value,
      course_of_study: courseOfStudy.value,
    };
    setLoading(true);
    try {
      const res = await axios.post(backendUrl + '/api/submit', { ...data });
      console.log(res);
      setLoading(false);
      setApplicationId(res.data.id);
      setPage('page-2');
      window.scroll(0, 0);
    } catch (error) {
      alert('error submitting request');

      setLoading(false);
    }
  }

  const completeSubmission = () => {
    let nulls = Object.values(documents).filter((d) => d === null);
    if (nulls.length > 0) {
      return alert('Uploads not completed!!!');
    }
    setPage('page-3');
  };

  useEffect(() => {
    function toTop() {
      window.scrollTo(0, 0);
    }
    toTop();
  }, []);

  return (
    <ContainerWrap>
      <section className='max-w-screen-lg mx-auto my-10 px-3 lg:px-0'>
        {page === 'page-1' && (
          <div>
            <PersonalDetailsForm
              loading={loading}
              handleSubmit={handlePersonalFormSubmit}
            />
          </div>
        )}

        {page === 'page-2' && (
          <div>
            <h1 className='text-black font-semibold text-center text-xl md:text-3xl'>
              Application Form (Documentation)
            </h1>
            <div className='flex items-center justify-between space-x-1 max-w-screen-md mx-auto mt-10'>
              <div className='py-3 px-3 rounded-full bg-[#00563B] text-white'>
                <TiTick />
              </div>

              <div className='h-[1px] bg-[#495057]  w-full'></div>

              <div className='py-1 px-3 rounded-full bg-[#00563B] text-white'>
                <p>2</p>
              </div>

              <div className='h-[1px] bg-[#495057] rounded-full w-full'></div>

              <div className='py-1 px-3 rounded-full bg-[#D6BFA9] text-[#341901]'>
                <p>3</p>
              </div>
            </div>
            <div>
              <div className='bg-[#FBE7D5] text-[#01100B] p-5 w-full text-center mt-10 mb-2 rounded-lg'>
                <i>
                  Make sure you select the <b>CORRECT IMAGES</b> of the required
                  documents, You will not be allowed to edit this submission!
                </i>
              </div>
              <i className='text-[#FF7900] text-center pt-2 block font-semibold mb-10'>
                Max limit of uploaded image is 2MB
              </i>

              <CertOfOrigin
                setDocuments={setDocuments}
                doc={documents.certificateOfOrigin}
                app_id={applicationId}
              />
              <BirthCertUpload
                setDocuments={setDocuments}
                doc={documents.birthCertificate}
                app_id={applicationId}
              />
              <AdmissionLetterUpload
                setDocuments={setDocuments}
                doc={documents.admissionLetter}
                app_id={applicationId}
              />
              <FeeScheduleUpload
                setDocuments={setDocuments}
                doc={documents.feeSchedule}
                app_id={applicationId}
              />
              <FeeReceipt
                setDocuments={setDocuments}
                doc={documents.feeReceipt}
                app_id={applicationId}
              />
              <AttestationLetterUpload
                setDocuments={setDocuments}
                doc={documents.letterOfAttestation}
                app_id={applicationId}
              />

              <FullPictureUpload
                setDocuments={setDocuments}
                doc={documents.picture}
                app_id={applicationId}
              />

              <div className='mt-10 flex gap-2 justify-between flex-col md:flex-row items-center'>
                <div></div>
                <button
                  onClick={completeSubmission}
                  className='text-center w-full md:w-auto border border-[#FF7900] bg-[#FF7900] text-white py-3 px-20 rounded'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {page === 'page-3' && (
          <div>
            <h1 className='text-black font-semibold text-center text-xl md:text-3xl'>
              Application successful!
            </h1>
            <div className='flex items-center justify-between space-x-1 max-w-screen-md mx-auto mt-10'>
              <div className='py-1 px-3 rounded-full bg-[#00563B] text-white'>
                <p>1</p>
              </div>

              <div className='h-[1px] bg-[#495057]  w-full'></div>

              <div className='py-1 px-3 rounded-full bg-[#00563B] text-white'>
                <p>2</p>
              </div>

              <div className='h-[1px] bg-[#495057] rounded-full w-full'></div>

              <div className='py-1 px-3 rounded-full bg-[#00563B] text-white'>
                <p>3</p>
              </div>
            </div>
            <div className='text-center text-xl md:text-3xl py-10'>
              You will be contacted via the email provided when your application
              has been reviewed.
            </div>
          </div>
        )}
      </section>
    </ContainerWrap>
  );
}
