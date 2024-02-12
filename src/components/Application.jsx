/* eslint-disable no-prototype-builtins */
import { useRef, useState } from 'react'
import { Certificate } from './Certificate'
import * as XLSX from 'xlsx'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import logo from '../assets/logo.png'

export function Application () {
  const [data, setData] = useState([])
  const [excelData, setExcelData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messageError, setMessageError] = useState({})

  const handleLogout = () => {
    document.cookie = 'data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost;'
    window.location.reload()
  }

  const refUpload = useRef(null)

  const handleFileUpload = (e) => {
    setExcelData(e.target.files[0])
  }

  const handleVerifyObject = ({ data }) => {
    const result = data?.some(item => item.hasOwnProperty('name') && item.hasOwnProperty('subject') && item.hasOwnProperty('date'))
    return result
  }

  const handleGeneratePdf = () => {
    if (!excelData) {
      setMessageError({ emptyData: 'Seleccione un documento' })
      setTimeout(() => {
        setMessageError({ emptyData: '' })
      }, 2000)
      return
    }
    setLoading(true)
    const reader = new FileReader()
    reader.readAsBinaryString(excelData)
    reader.onload = (e) => {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: 'binary' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedata = XLSX.utils.sheet_to_json(sheet)

      if (handleVerifyObject({ data: parsedata })) {
        setData(parsedata)
      } else {
        setMessageError({ invalidObject: 'Excel inválido' })
        setTimeout(() => {
          setMessageError({ invalidObject: '' })
        }, 2000)
      }

      // setData(parsedata)
    }
    setLoading(false)
  }

  const handleNew = (e) => {
    e.preventDefault()
    setExcelData(null)
    setData([])
    refUpload.current.value = ''
  }
  return (
    <section className=' container mx-auto px-5'>
      <div className=' flex justify-between items-center py-5 border-b pb-5'>
        <img src={logo} className='w-32' />
        <button onClick={handleLogout} className='flex items-center gap-2'>
          Salir
          <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M15 12L6 12M6 12L8 14M6 12L8 10' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            <path d='M12 21.9827C10.4465 21.9359 9.51995 21.7626 8.87865 21.1213C8.11027 20.3529 8.01382 19.175 8.00171 17M16 21.9983C18.175 21.9862 19.3529 21.8897 20.1213 21.1213C21 20.2426 21 18.8284 21 16V14V10V8C21 5.17157 21 3.75736 20.1213 2.87868C19.2426 2 17.8284 2 15 2H14C11.1715 2 9.75733 2 8.87865 2.87868C8.11027 3.64706 8.01382 4.82497 8.00171 7' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
            <path d='M3 9.5V14.5C3 16.857 3 18.0355 3.73223 18.7678C4.46447 19.5 5.64298 19.5 8 19.5M3.73223 5.23223C4.46447 4.5 5.64298 4.5 8 4.5' stroke='#1C274C' strokeWidth='1.5' strokeLinecap='round' />
          </svg>
        </button>
      </div>
      <h1 className='text-center text-2xl font-medium text-stone-700 pt-10'>Generador de certificados MEDICOS SALUD</h1>
      <div className='grid grid-cols-12'>
        <div className='col-span-12 py-4'>
          <div className='flex gap-5'>
            <label
              className='block mb-2 text-sm font-medium'
              htmlFor='file_input'
            >Subir archivo
            </label>
            <a href='/public/data.xlsx'>
              <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' clipRule='evenodd' d='M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H7C7.55228 21 8 21.4477 8 22C8 22.5523 7.55228 23 7 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM19 12C19.5523 12 20 12.4477 20 13V19H23C23.5523 19 24 19.4477 24 20C24 20.5523 23.5523 21 23 21H19C18.4477 21 18 20.5523 18 20V13C18 12.4477 18.4477 12 19 12ZM11.8137 12.4188C11.4927 11.9693 10.8682 11.8653 10.4188 12.1863C9.96935 12.5073 9.86526 13.1318 10.1863 13.5812L12.2711 16.5L10.1863 19.4188C9.86526 19.8682 9.96935 20.4927 10.4188 20.8137C10.8682 21.1347 11.4927 21.0307 11.8137 20.5812L13.5 18.2205L15.1863 20.5812C15.5073 21.0307 16.1318 21.1347 16.5812 20.8137C17.0307 20.4927 17.1347 19.8682 16.8137 19.4188L14.7289 16.5L16.8137 13.5812C17.1347 13.1318 17.0307 12.5073 16.5812 12.1863C16.1318 11.8653 15.5073 11.9693 15.1863 12.4188L13.5 14.7795L11.8137 12.4188Z' fill='#000000' />
              </svg>
            </a>
          </div>
          <input
            ref={refUpload}
            className='block w-full text-sm text-gray-900 border
         border-gray-300 rounded-md cursor-pointer bg-gray-50
         focus:outline-none file:bg-yellow-500 file:border-0 file:py-2'
            aria-describedby='file_input_help'
            id='file_input'
            type='file'
            accept='.xlsx, .xls'
            onChange={handleFileUpload}
          />
          <p className='text-red-500 text-sm'>{messageError.invalidObject}</p>
          <p className='text-red-500 text-sm'>{messageError.emptyData}</p>
        </div>
      </div>
      <div />

      <section className='flex flex-col gap-5 pb-5'>
        <div className='flex gap-5'>
          <button
            className='bg-yellow-500 rounded-md px-10 py-2 w-full disabled:bg-slate-300 hover:bg-yellow-600'
            onClick={handleGeneratePdf}
            disabled={loading}
          >
            {loading ? 'Generando...' : 'Generar'}
          </button>
          <button
            className='bg-white  rounded-md px-10 py-2 w-full disabled:bg-slate-300 hover:bg-slate-100 border border-yellow-500'
            onClick={handleNew}
          >
            Nuevo
          </button>
        </div>
      </section>
      {
      data.length > 0 &&
        <>
          <div className='pb-5'>
            <PDFDownloadLink
              document={<Certificate data={data} />}
              fileName='exp.pdf'
            >
              {
              ({ loading, url, error, blob }) => loading
                ? <button className='bg-yellow-500 rounded-md px-10 py-2 w-full disabled:bg-slate-300 hover:bg-yellow-600'>Descargando</button>
                : <button className='bg-yellow-500 rounded-md px-10 py-2 w-full disabled:bg-slate-300 hover:bg-yellow-600'>Descargar</button>
            }
            </PDFDownloadLink>
          </div>
          <PDFViewer
            width='100%'
            height='900px'
          >
            <Certificate data={data} />
          </PDFViewer>
        </>
    }
    </section>
  )
}
