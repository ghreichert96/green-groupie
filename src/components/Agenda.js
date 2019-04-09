import React from 'react';
import {withStyles, Typography, Table, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';


const styles = { 
    timeColumn:{
        width: 20,
        padding: 1
    },
    head:{
        position: 'sticky',
        top: 0
    }
};

const time = []

for (var i = 0; i < 24; i++){
    let temp = [i, '', '', '']
    if (i === 10 || i === 11){
        temp[1] = 'Best time to meet'
    }
    if (i === 20|| i === 21){
        temp[2] = '2nd Best time to meet'

    }
    if (i === 14 || i === 15){
        temp[3] = '3rd Best time to meet'
    }
    time.push(temp)
}



function Agenda({classes}) {
    return(
        <div className = "App">
            <Table className = {classes.table}>
                <TableHead className = {classes.head}>
                    <TableRow>
                        <TableCell className = {`${classes.timeColumn} ${classes.head}`}/> 
                        <TableCell align = 'center' className = {classes.head}> Monday <br /> April 1</TableCell>
                        <TableCell align = 'center' className = {classes.head}> Tuesday <br /> April 2</TableCell>
                        <TableCell align = 'center' className = {classes.head}> Wednesday <br /> April 3</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {time.map((time)=>{
                        return(
                            <TableRow>
                                <TableCell align = 'center' className = {classes.timeColumn}>{time[0]}:00</TableCell>
                                <TableCell align = 'center'> 
                                    <Typography color="primary">
                                        {time[1]} 
                                    </Typography>
                                 </TableCell>
                                 <TableCell align = 'center'> 
                                    <Typography color="secondary">
                                        {time[2]} 
                                    </Typography>
                                 </TableCell>
                                 <TableCell align = 'center'> 
                                    <Typography  color="inherit">
                                        {time[3]} 
                                    </Typography>
                                 </TableCell>
                            </TableRow>
                        );
                        })
                    }
    
                </TableBody>
            </Table>
        </div>
    );
}

export default withStyles(styles)(Agenda);