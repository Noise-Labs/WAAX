!function(WX){"use strict";function WXS1(preset){WX.PlugIn.defineType(this,"Generator"),this._osc1=WX.OSC(),this._osc2=WX.OSC(),this._osc1gain=WX.Gain(),this._osc2gain=WX.Gain(),this._lowpass=WX.Filter(),this._amp=WX.Gain(),this._osc1.to(this._osc1gain).to(this._lowpass),this._osc2.to(this._osc2gain).to(this._lowpass),this._lowpass.to(this._amp),this._amp.to(this._output),this._osc1.start(0),this._osc2.start(0),this._amp.gain.value=0,this.BUSY=!1,WX.defineParams(this,{osc1type:{type:"Itemized",name:"Waveform","default":"square",model:WX.WAVEFORMS},osc1octave:{type:"Generic",name:"Octave","default":0,min:-5,max:5,unit:"Octave"},osc1gain:{type:"Generic",name:"Gain","default":.5,min:0,max:1,unit:"LinearGain"},osc2type:{type:"Itemized",name:"Waveform","default":"square",model:WX.WAVEFORMS},osc2detune:{type:"Generic",name:"Semitone","default":0,min:-60,max:60,unit:"Semitone"},osc2gain:{type:"Generic",name:"Gain","default":.5,min:0,max:1,unit:"LinearGain"},cutoff:{type:"Generic",name:"Cutoff","default":1e3,min:20,max:5e3,unit:"Hertz"},reso:{type:"Generic",name:"Reso","default":0,min:0,max:20,unit:""},filterMod:{type:"Generic",name:"FiltMod","default":1,min:.25,max:8,unit:""},filterAttack:{type:"Generic",name:"FiltAtt","default":.02,min:0,max:5,unit:"Seconds"},filterDecay:{type:"Generic",name:"FiltDec","default":.04,min:0,max:5,unit:"Seconds"},filterSustain:{type:"Generic",name:"FiltSus","default":.25,min:0,max:1},filterRelease:{type:"Generic",name:"FiltRel","default":.2,min:0,max:10,unit:"Seconds"},ampAttack:{type:"Generic",name:"Att","default":.02,min:0,max:5,unit:"Seconds"},ampDecay:{type:"Generic",name:"Dec","default":.04,min:0,max:5,unit:"Seconds"},ampSustain:{type:"Generic",name:"Sus","default":.25,min:0,max:1},ampRelease:{type:"Generic",name:"Rel","default":.2,min:0,max:10,unit:"Seconds"}}),WX.PlugIn.initPreset(this,preset)}WXS1.prototype={info:{name:"WXS1",version:"0.0.2",api_version:"1.0.0-alpha",author:"Hongchan Choi",type:"Generator",description:"2 OSC Monophonic Subtractive Synth"},defaultPreset:{osc1type:"square",osc1octave:-1,osc1gain:.6,osc2type:"square",osc2detune:7,osc2gain:.6,cutoff:140,reso:18,filterMod:7,filterAttack:.01,filterDecay:.07,filterSustain:.5,filterRelease:.03,ampAttack:.01,ampDecay:.44,ampSustain:.2,ampRelease:.06,output:.8},$osc1type:function(value){this._osc1.type=value},$osc1octave:function(value,time,rampType){this._osc1.detune.set(1200*value,time,rampType)},$osc1gain:function(value,time,rampType){this._osc1gain.gain.set(value,time,rampType)},$osc2type:function(value){this._osc2.type=value},$osc2detune:function(value,time,rampType){this._osc2.detune.set(100*value,time,rampType)},$osc2gain:function(value,time,rampType){this._osc2gain.gain.set(value,time,rampType)},$cutoff:function(value,time,rampType){this._lowpass.frequency.set(value,time,rampType)},$reso:function(value,time,rampType){this._lowpass.Q.set(value,time,rampType)},noteOn:function(pitch,velocity,time){time=time||WX.now;var p=this.params,aAtt=p.ampAttack.get(),aDec=p.ampDecay.get(),fAmt=1200*p.filterMod.get(),fAtt=p.filterAttack.get(),fDec=p.filterDecay.get(),fSus=p.filterSustain.get();return this._osc1.frequency.set(WX.mtof(pitch),time+.02,1),this._osc2.frequency.set(WX.mtof(pitch),time+.02,1),this._amp.gain.set(1,[time,aAtt],3),this._lowpass.detune.set(fAmt,[time,fAtt],3),this._amp.gain.set(fSus,[time+aAtt,aDec],3),this._lowpass.detune.set(fAmt*fSus,[time+fAtt,fDec],3),this},glide:function(pitch,time){time=(time||WX.now)+.04,this._osc1.frequency.set(WX.mtof(pitch),time,1),this._osc2.frequency.set(WX.mtof(pitch),time,1)},noteOff:function(time){time=time||WX.now;var p=this.params;return this._amp.gain.cancel(time),this._lowpass.detune.cancel(time),this._amp.gain.set(0,[time,p.ampRelease.get()],3),this._lowpass.detune.set(0,[time,p.filterRelease.get()],3),this},onData:function(action,data){switch(action){case"noteon":this.noteOn(data.pitch,data.velocity);break;case"glide":this.glide(data.pitch);break;case"noteoff":this.noteOff()}}},WX.PlugIn.extendPrototype(WXS1,"Generator"),WX.PlugIn.register(WXS1)}(WX);