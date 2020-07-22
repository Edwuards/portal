import { Component } from './menu';

export function Menu(inject){
  const menu = this;
  Component.call(this,inject,{context:'calendar',navbar:'calendar'});

  this.buttons.name.calendar.events.on('click',function(){ menu.changeContext({context: 'calendar', navbar: 'calendar'}); });

  this.buttons.name.profile.events.on('click',function(){ menu.changeContext({context: 'profile', navbar: 'profile'}); });


}
