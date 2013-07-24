/*

 GT.M Region DSE Warp List for EWD Lite 2013/07/23 13:12
 
  Written by Kiyoshi Sawada <casiopea.tpine@gmail.com>
  Copyright c 2013 Japan DynaSystems Inc.
 
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License (AGPL)
  as published by the Free Software Foundation, either version 3 of
  the License, or (at your option) any later version.
 
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU Affero General Public License for more details.
 
  You should have received a copy of the GNU Affero General Public 
  License along with this program. 
 If not, see http://www.gnu.org/licenses/.
 
*/

EWD.application = {
  name: 'dsewarp'
};

EWD.loader = {enabled: false};
EWD.requires = '';

Ext.application({
 name:'GTM Region DSE warp list',
 launch: function() {
   if (EWD.loader.enabled) Ext.Loader.setConfig(EWD.loader);
   if (EWD.requires !== '') {
     Ext.require(EWD.requires, function() {EWD.ext4.content()});
   }
   else {
     EWD.ext4.content()
   }
 }
});

EWD.stores = {
  dseWarpGridStore: Ext.create('Ext.data.Store', {
    fields: [
      {name: 'FIELD_NAME'}
    ]
  })
};

EWD.grid = {
  dseWarpGridPanel: Ext.create('Ext.grid.Panel',{
    frame: true,
    //hidden: true,
    id: 'dseWarp',
    store: EWD.stores.dseWarpGridStore,
    //title: 'DSE Warp',
    width: 570,
    xtype: 'gridpanel',
    viewConfig: {
        markDirty: false
     },
     columns: [
       {  dataIndex: 'FIELD_NAME',
          text: 'FIELD_NAME',
          width: 350,
          xtype: 'gridcolumn'
       }
     ]
  
  })
};

EWD.ext4 = {
  content: function () {
    Ext.create("Ext.container.Viewport", {
      layout: "border",
      renderTo: Ext.getBody(),
      items: [
        {  id: "centerPanel",
           region: "center",
           resizable: true,
           xtype: "tabpanel",
           // DSE Warp Panel
           items: [
             {  id: "mainPanel",
                layout: "fit",
                title: "GT.M Region DSE Warp List",
                xtype: "panel",
                items: EWD.grid.dseWarpGridPanel
             }
           ]
        }
      ]
    });

    // Login
    Ext.create("Ext.window.Window", {
      autoShow: true,
      height: 200,
      id: "loginPanel",
      layout: "fit",
      modal: true,
      closable: true,
      renderTo: Ext.getBody(),
      title: "GT.M Region DSE Warp List",
      width: 400,
      items: [
        {  bodyPadding: 10,
           xtype: "form",
           id: 'loginForm',
           items: [
             {  title: "See ewdGateway2 startup file for password",
                xtype: "fieldset",
                items: [
                  {  allowBlank: false,
                     fieldLabel: "Password",
                     id: "password",
                     inputType: "password",
                     name: "password",
                     xtype: "textfield",
		     listeners: {
		       afterrender : function(field) { field.focus(false, 1000); }
		     }
                  }
                ]
             }
           ],
           buttons: [
             {  handler: function () {
                  if (!EWD.initialised) {
                    Ext.Msg.alert('WebSocket connection not initialised: please wait a few seconds and try again'); 
                    closeMsg();
                    return;
                  }
                  EWD.sockets.submitForm({
                    id: 'loginForm',
                    alertTitle: 'An error occurred',
                    messageType: 'EWD.form.login'
                  });
                },
                text: "Login",
                xtype: "button",
                id: 'loginBtn',
                hidden: true
             }
           ]
        }
      ]
    });    

    
  }  
}