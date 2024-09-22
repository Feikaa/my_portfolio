import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import Pickaxe from '../icons/pickaxe.png';
import Controller from '../icons/controller.svg';
import Gear from '../icons/gear.svg';

function Folder() {

    const [pressing, setPressing] = useState(false);

    const openLink = (url) => {
        window.open(url, '_blank').focus();
    }

    useEffect(() => {
        window.addEventListener("pointerdown", () => setPressing(true));
        window.addEventListener("pointerup", () => setPressing(false));

        return () => {
            window.removeEventListener("pointerdown", () => setPressing(true));
            window.removeEventListener("pointerup", () => setPressing(false));
          };
    })

  return (
    <Grid container className='p-2' spacing={2}>
        <Grid item>
            <div onDoubleClick={() => {openLink('https://github.com/Feikaa/realm-harvest')}} tabIndex="0" className={`select-none items-center justify-center align-middle flex-col w-28 h-28 text-white text-center border-2 border-cyan-400/0 ${pressing ? '' : 'hover:bg-sky-500 focus-within:border-cyan-600/50'}`}><img src={Pickaxe} className='w-16 h-16 pointer-events-none block m-auto' /><div className='text-sm w-16 h-8 block m-auto'>Realm Harvest</div></div>
        </Grid>

        <Grid item>
            <div onDoubleClick={() => {openLink('https://feikaa.github.io/runecrafter/')}} tabIndex="0" className={`select-none items-center justify-center align-middle flex-col w-28 h-28 text-white text-center border-2 border-cyan-400/0 ${pressing ? '' : 'hover:bg-sky-500 focus-within:border-cyan-600/50'}`}><img src={Controller} className='w-16 h-16 pointer-events-none block m-auto items-center justify-center align-middle' /><div className='text-sm w-16 h-8 block m-auto items-center justify-center align-middle'>Rune- crafter</div></div>
        </Grid>

        <Grid item>
            <div onDoubleClick={() => {openLink('https://github.com/Feikaa/PlantMod')}} tabIndex="0" className={`select-none items-center justify-center align-middle flex-col w-28 h-28 text-white text-center border-2 border-cyan-400/0 ${pressing ? '' : 'hover:bg-sky-500 focus-within:border-cyan-600/50'}`}><img src={Gear} className='w-16 h-16 pointer-events-none block m-auto items-center justify-center align-middle' /><div className='text-sm w-16 h-8 block m-auto items-center justify-center align-middle'>Plant Mod</div></div>
        </Grid>
    </Grid>
  )
}

export default Folder