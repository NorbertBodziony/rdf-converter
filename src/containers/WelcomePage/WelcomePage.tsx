/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import useStyles from './style'
import { Namespace, parse, graph, serialize, Formula } from 'rdflib'
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import CommonButton from '@components/CommonButton/CommonButton'
const HTMLContentType = 'text/html'
const JSONLDContentType = 'application/ld+json'
const N3ContentType = 'text/n3'
const N3LegacyContentType = 'application/n3'
const NQuadsAltContentType = 'application/nquads'
const NQuadsContentType = 'application/n-quads'
const NTriplesContentType = 'application/n-triples'
const RDFXMLContentType = 'application/rdf+xml'
const SPARQLUpdateContentType = 'application/sparql-update'
const TurtleContentType = 'text/turtle'
const TurtleLegacyContentType = 'application/x-turtle'
const XHTMLContentType = 'application/xhtml+xml'
const AllTypes = [
  HTMLContentType,
  JSONLDContentType,
  N3ContentType,
  N3LegacyContentType,
  NQuadsAltContentType,
  NTriplesContentType,
  RDFXMLContentType,
  SPARQLUpdateContentType,
  TurtleContentType,
  XHTMLContentType,
  TurtleLegacyContentType,
  NQuadsContentType
]
var str = `
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
           xmlns:foaf="http://xmlns.com/foaf/0.1/">
   <foaf:Person rdf:about="http://dbpedia.org/page/Spider-Man">
     <foaf:name>Peter Parker</foaf:name>
     <foaf:mbox rdf:resource="mailto:peter.parker@dailybugle.com"/>
   </foaf:Person>
  </rdf:RDF>
`
var contentType = 'application/rdf+xml'
var baseUrl = 'http://IoFTriples.com'
const WelcomePage: React.FC = () => {
  const classes = useStyles()
  const [rdf, setRdf] = useState(str)
  const [jsonld, setJsonld] = useState('')
  const [error, setError] = useState('')
  const [outputType, setOutputType] = useState<typeof AllTypes[number]>(JSONLDContentType)

  const convert = () => {
    try {
      var store = graph()
      parse(rdf, store, baseUrl, contentType)
      console.log(outputType)
      serialize(null as any, store, baseUrl, outputType, (err: any, jsonldData: any) => {
        if (err) {
          console.log(err)
          setError('Invalid RDF syntax')

          return
        }
        if (jsonldData.includes('error')) {
          console.log('error')
          setError('Invalid RDF syntax')
          return
        }
        try {
          const parsed = JSON.stringify(JSON.parse(jsonldData), null, 2)
          setJsonld(parsed)
          setError('')
        } catch (error) {
          setJsonld(jsonldData)
          setError('')
        }
      })
    } catch (error) {
      console.log(error)
      setError('Invalid RDF syntax')
    }
  }
  return (
    <Grid container className={classes.background} direction='column' spacing={4}>
      <Grid item className={classes.header}>
        <Grid container>
          <Grid item xs>
            <Typography color='textPrimary' variant='h2'>
              RDF converter
            </Typography>
          </Grid>
          <Grid item xs>
            <FormControl variant='filled' color='primary' className={classes.select}>
              <InputLabel id='demo-simple-select-filled-label' color='primary'>
                Select output format
              </InputLabel>
              <Select
                value={outputType}
                defaultValue={outputType}
                MenuProps={{ classes: { paper: classes.selectMenu } }}
                onChange={v => {
                  setOutputType(v.target.value as any)
                }}>
                {AllTypes.map(v => {
                  return (
                    <MenuItem value={v} className={classes.option}>
                      {v}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Grid container spacing={3} style={{ width: '100%' }}>
          <Grid item xs>
            <TextField
              label='RDF'
              error={!!error}
              multiline
              rows={20}
              value={rdf}
              onChange={e => {
                setRdf(e.target.value)
              }}
              className={classes.input}
              defaultValue='Default Value'
              variant='filled'
            />
            {error && (
              <Typography variant='h5' style={{ color: 'red' }}>
                {error}
              </Typography>
            )}
          </Grid>
          <Grid item xs>
            <TextField
              label={outputType}
              multiline
              rows={20}
              disabled
              value={jsonld}
              className={classes.input}
              defaultValue='Default Value'
              variant='filled'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Grid container justify='center'>
          <Grid item>
            <CommonButton
              name='Convert'
              onClick={() => {
                convert()
              }}></CommonButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WelcomePage
