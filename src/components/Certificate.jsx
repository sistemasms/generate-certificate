/* eslint-disable react/prop-types */
import { Page, Document, StyleSheet, Image, Text, Font, View } from '@react-pdf/renderer'
import plantilla from '../assets/plantilla.jpg'
import calibri from '../assets/calibri.ttf'
import MADEThommySoftThin from '../assets/MADE Tommy Soft Thin.ttf'
import MADEThommySoftExtraBold from '../assets/MADE Tommy Soft ExtraBold.ttf'

export function Certificate ({
  data
}) {
  Font.register(
    {
      family: 'calibri',
      src: calibri
    }
  )

  Font.register(
    {
      family: 'MADE Tommy Soft Thin',
      src: MADEThommySoftThin
    }
  )

  Font.register(
    {
      family: 'MADE Tommy Soft ExtraBold',
      src: MADEThommySoftExtraBold
    }
  )

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      display: 'flex',
      backgroundColor: '#fff'
    },
    name: {
      top: '2%',
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
      bottom: '23%'
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
    },
    text02: {
      fontSize: '18',
      fontFamily: 'calibri',
      color: '#636363',
      bottom: '10%'
    },
    businessName: {
      fontSize: '23',
      fontFamily: 'MADE Tommy Soft ExtraBold',
      textTransform: 'uppercase',
      color: '#1770B7',
      top: '24%'
    },
    subTitile: {
      fontSize: '16',
      fontFamily: 'MADE Tommy Soft Thin',
      textTransform: 'uppercase',
      color: '#1F3864',
      top: '13%'
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
                  <Text style={styles.businessName}>MEDICOS SALUD UNIÓN EN ALERTA SAC</Text>
                  <Text style={styles.subTitile}>OTORGA EL SIGUIENTE CERTIFICADO A:</Text>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.text02}>Por haber participado en la capacitación y entrenamiento de:</Text>
                  <Text style={styles.theme}>{item.subject}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
              </View>
            </Page>
          ))
      }
    </Document>
  )
}
