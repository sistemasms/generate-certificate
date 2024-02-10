/* eslint-disable react/prop-types */
import { Page, Document, StyleSheet, Image, Text, Font } from '@react-pdf/renderer'
import plantilla from '../assets/plantilla.jpg'
import Coneria from '../assets/coneria.ttf'

export function Certificate ({
  data
}) {
  Font.register({
    family: 'Coneria',
    src: Coneria
  })

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    name: {
      position: 'absolute',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '53%',
      left: '34%',
      border: 'solid 1px',
      fontSize: '34',
      fontFamily: 'Coneria'
    },
    theme: {
      position: 'absolute',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: '70%',
      left: '20%',
      border: 'solid 1px'
    }
  })

  return (
    <Document>
      {
        data &&
          data?.map((item, index) => (
            <Page key={index} size='A4' orientation='landscape' style={styles.page}>
              <Image src={plantilla} />
              <Text style={styles.name}>{item.nombres}</Text>
              <Text style={styles.theme}>{item.tema}</Text>
            </Page>
          ))
      }
    </Document>
  )
}
