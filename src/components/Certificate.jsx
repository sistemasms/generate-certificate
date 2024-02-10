/* eslint-disable react/prop-types */
import { Page, Document, StyleSheet, Image, Text, Font, View } from '@react-pdf/renderer'
import plantilla from '../assets/plantilla.jpg'
import calibri from '../assets/calibri.ttf'

export function Certificate ({
  data
}) {
  Font.register({
    family: 'calibri',
    src: calibri
  })

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      display: 'flex',
      backgroundColor: '#fff'
    },
    name: {
      top: '39%',
      fontSize: '34',
      fontFamily: 'calibri',
      textTransform: 'uppercase',
      color: '#1F3864'
    },
    theme: {
      fontSize: '24',
      fontFamily: 'calibri',
      textTransform: 'uppercase',
      color: '#1F3864',
      top: '5%'
    },
    date: {
      fontSize: '18',
      fontFamily: 'calibri',
      textTransform: 'lowercase',
      color: '#636363',
      bottom: '35%'
    },
    contentText: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      justifyContent: 'space-between'
    },
    image: {
      position: 'absolute',
      height: '100%',
      width: '100%'
    },
    content: {
      position: 'relative',
      width: '100%',
      height: '100%'
    }
  })

  return (
    <Document>
      {
        data &&
          data?.map((item, index) => (
            <Page key={index} size='A4' orientation='landscape' style={styles.page}>
              <View style={styles.content}>
                <Image src={plantilla} style={styles.image} />
                <View style={styles.contentText}>
                  <Text style={styles.name}>{item.nombres}</Text>
                  <Text style={styles.theme}>{item.tema}</Text>
                  <Text style={styles.date}>{item.fecha}</Text>
                </View>
              </View>
            </Page>
          ))
      }
    </Document>
  )
}
