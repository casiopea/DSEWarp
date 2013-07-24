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

EWD.onSocketsReady = function() {
  Ext.getCmp('loginBtn').show();
};

EWD.onSocketMessage = function(messageObj) {
  if (EWD.sockets.trace) console.log("serverMessageHandler: messageObj = " + JSON.stringify(messageObj));

  if (messageObj.type === 'EWD.form.login') {
    EWD.password = Ext.getCmp('password').getValue();
    if (messageObj.ok) Ext.getCmp('loginPanel').destroy();
    EWD.sockets.sendMessage({type: "getRegionList"});
    EWD.sockets.sendMessage({type: "getDseWarpData"});
  }

  if (messageObj.type === 'getRegionList') {
    var i;
    var store=[];
    var gridModel=[];
    gridModel[0] = { header: 'FIELD_NAME', dataIndex: 'FIELD_NAME', text: 'FIELD_NAME', width: 300 } ;
    store[0] = { name: 'FIELD_NAME' }
    for(i in messageObj.message) {
      var obj = messageObj.message[i];
      ++i;
      gridModel[i] = { header: obj, dataIndex: obj, text: obj, width: 200 } ;
      store[i] = { name: obj }
    }
    var storeModel = Ext.create('Ext.data.Store', { storeId: 'dseWarpGridStore', fields: store });
    EWD.grid.dseWarpGridPanel.reconfigure( storeModel, Ext.grid.ColumnModel(gridModel) );
  }

  if (messageObj.type === 'getDseWarpData') {
    EWD.grid.dseWarpGridPanel.store.loadData(messageObj.message);
    Ext.getCmp('dseWarp').show();
  }

};
