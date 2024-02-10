/* eslint-disable no-prototype-builtins */
import { useState, useRef } from 'react'
import * as XLSX from 'xlsx'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Certificate } from './components/Certificate'

function App () {
  const [data, setData] = useState([])
  const [excelData, setExcelData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messageError, setMessageError] = useState({})

  const refUpload = useRef(null)

  const handleFileUpload = (e) => {
    setExcelData(e.target.files[0])
  }

  const handleVerifyObject = ({ data }) => {
    const result = data?.some(item => item.hasOwnProperty('nombres') && item.hasOwnProperty('tema'))
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
      <div className='grid grid-cols-12'>
        <div className='col-span-12 py-4'>
          <label
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            htmlFor='file_input'
          >Subir archivo
          </label>
          <input
            ref={refUpload}
            className='block w-full text-sm text-gray-900 border
           border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400
           focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
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

      <section className='flex flex-col gap-5 pb-5'>
        <div className='flex gap-5'>
          <button
            className='bg-gray-50 rounded-md px-10 py-2 w-full disabled:bg-slate-300'
            onClick={handleGeneratePdf}
            disabled={loading}
          >
            {loading ? 'Generando...' : 'Generar'}
          </button>
          <button
            className='bg-gray-50 rounded-md px-10 py-2 w-full disabled:bg-slate-300'
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
                  ? <button className='bg-gray-50 rounded-md px-10 py-2 w-full'>Descargando</button>
                  : <button className='bg-gray-50 rounded-md px-10 py-2 w-full'>Descargar</button>
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

export default App
