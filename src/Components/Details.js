import React, { useEffect } from 'react';
import _ from 'lodash';
import { a, useSprings } from 'react-spring';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export const Details = ({ activeFloor, setActiveFloor, floorName }) => {

  let hardcodedDetails = [
    {
      id: 4,
      floorName: 'Ground Floor',
      doors: ['Door1', 'Door2', 'Door3'],
      panels: ['Panel1', 'Panel2', 'Panel3'],
      cameras: ['Camera1', 'Camera2', 'Camera3'],
    },
    {
      id: 3,
      floorName: 'First Floor',
      doors: ['Door11', 'Door12', 'Door13'],
      panels: ['Panel11', 'Panel12', 'Panel13'],
      cameras: ['Camera11', 'Camera12', 'Camera13'],
    },
    {
      id: 2,
      floorName: 'Second Floor',
      doors: ['Door21', 'Door22', 'Door23'],
      panels: ['Panel21', 'Panel22', 'Panel23'],
      cameras: ['Camera21', 'Camera22', 'Camera23'],
    },
    {
      id: 1,
      floorName: 'Third Floor',
      doors: ['Door31', 'Door32', 'Door33'],
      panels: ['Panel31', 'Panel32', 'Panel33'],
      cameras: ['Camera31', 'Camera32', 'Camera33'],
    },
    {
      id: 0,
      floorName: 'Fourth Floor',
      doors: ['Door41', 'Door42', 'Door43'],
      panels: ['Panel41', 'Panel42', 'Panel43'],
      cameras: ['Camera41', 'Camera42', 'Camera43'],
    },
  ];

  let currentCameras = [];
  let currentDoors = [];
  let currentPanels = [];

    hardcodedDetails.map(floor => {
      if(activeFloor === floor.id) {
        floorName = floor.floorName;
        currentCameras = floor.cameras;
        currentDoors = floor.doors;
        currentPanels = floor.panels;
        console.log("currentCameras ", currentCameras);
      }
    });

  return (
    <div style={{ marginTop: '50px' }}>
      <div>{floorName}</div>
      <div className="root" style={{ margin: '50px' }}>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#154360'}}>
            <Typography className="heading">Panels</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: '#154360'}}>
            {currentPanels.map(panel => (
            <Card className="root"  style={{ margin: '10px' }}>
                <CardContent>
                  <Typography  color="textSecondary" gutterBottom>
                    {panel}
                  </Typography>
                </CardContent>
              </Card>))
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#154360'}}>
            <Typography className="heading">Doors</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: '#154360'}}>
            {currentDoors.map(door => (
            <Card className="root" style={{ margin: '10px' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {door}
                  </Typography>
                </CardContent>
              </Card>))
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: '#154360'}}>
            <Typography className="heading">Cameras</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ backgroundColor: '#154360'}}>
            {currentCameras.map(camera => (
            <Card className="root" style={{ margin: '10px' }}>
                <CardContent>
                  <Typography  color="textSecondary" gutterBottom>
                    {camera}
                  </Typography>
                </CardContent>
              </Card>))
            }
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
};
