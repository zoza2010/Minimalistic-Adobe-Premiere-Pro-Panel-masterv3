if (typeof($) == 'undefined') $ = {};
$._MYFUNCTIONS = {
	say: function(something) {
		$.writeln(something); // output to ExtendScript Toolkit Console
		alert(something); // invoke a warning popup
		return "thanks"; // return a string back to JavaScript
	},

	traverse_project_items: function() {
		return result;
	}
}
//test4


function upper_clips() {
    app.enableQE();  
    var proj = app.project;
    message='upper_clips_renamer';
	app.setSDKEventMessage(message, 'info');
	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
        }
    clips=vTrack.clips.numItems
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    for (var i = 0; i < clips; i++) {
        j=i+1;
        num=j;
        if (j< 10) num="00" + j;
        if  (j<100 && j>9) num="0" + j;
        vTrack.clips[i].name="sc"+num;
        tr=activeSequence.videoTracks.numTracks-1;
        var clip = qe.project.getActiveSequence().getVideoTrackAt(tr).getItemAt(i);
        clip.addVideoEffect(qe.project.getVideoEffectByName("Clip Name"));
        }

    }
}

function export_xml() {
		if (app.project.activeSequence) {
			var projPath			= new File(app.project.path);
			var parentDir			= projPath.parent;
			var outputName			= app.project.activeSequence.name;
			var xmlExtension		= '.xml';
			var outputPath			= Folder.selectDialog("Choose the output directory");
            //var outputPath			= Folder().selectDialog("Choose the output directory");

			if (outputPath) {
				var completeOutputPath = outputPath.fsName +"\\" +outputName + xmlExtension;
                message = completeOutputPath;
				app.project.activeSequence.exportAsFinalCutProXML(completeOutputPath, 1); // 1 == suppress UI
				app.setSDKEventMessage(message, 'info');
			} else {
                app.setSDKEventMessage("No output path chosen.", 'Error');
			}
		} else {
            app.setSDKEventMessage("No active sequence.", 'Error');
		}

}

function m_upper_clips() {
    app.enableQE();  
    var proj = app.project;
//    message='upper_clips_renamer';
//	app.setSDKEventMessage(message, 'info');
	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack_ep = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-2];
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
        }
    clips_ep=vTrack_ep.clips.numItems
    clips=vTrack.clips.numItems
    last_clip=0;
    for (var i = 0; i < clips_ep; i++) {
        j=i+1;
        num=j;
        if (j< 10) num="00" + j;
        if  (j<100 && j>9) num="0" + j;
        vTrack_ep.clips[i].name="ep"+num;
        var ep_name="ep"+num;
        ep_start_time= vTrack_ep.clips[i].start.seconds;
        ep_end_time= vTrack_ep.clips[i].end.seconds;
        cc=0;
        
//        message='last_clip='+last_clip;
//        app.setSDKEventMessage(message, 'info');
        for ( var k=last_clip; k <clips; k++)
            {

            if ( (vTrack.clips[k].end.seconds <= ep_end_time) && (vTrack.clips[k].start.seconds >= ep_start_time) )
                {

                l=cc+1;
                num=l;
                if (l< 10) num="00" + l;
                if  (l<100 && l>9) num="0" + l;
                vTrack.clips[k].name=ep_name+"sc"+num;
                tr=activeSequence.videoTracks.numTracks-1;
                var clip = qe.project.getActiveSequence().getVideoTrackAt(tr).getItemAt(k);
                clip.addVideoEffect(qe.project.getVideoEffectByName("Clip Name"));
                clip_k=vTrack.clips[k];
//
                for (var a = 0;a<clip_k.components.numItems;a++){
                    if( clip_k.components[a].displayName == "Clip Name")
                    {
                    x=clip_k.components[a].properties[0].getValue()[0];
                    y=clip_k.components[a].properties[0].getValue()[1];
                    clip_k.components[a].properties[0].setValue([x*0.25,y*0.2]);
                
                    }
                }
                clip.addVideoEffect(qe.project.getVideoEffectByName("Timecode"));
                clip_k=vTrack.clips[k];
                for (var a = 0;a<clip_k.components.numItems;a++){
                    if( clip_k.components[a].displayName == "Timecode")
                    {
                    x=clip_k.components[a].properties[0].getValue()[0];
                    y=clip_k.components[a].properties[0].getValue()[1];
                    clip_k.components[a].properties[0].setValue([x*0.5,y]);
                    //res=clip_k.components[a].properties[3].getValue(0);
                    //message=' _3_ ='+res;
                    //app.setSDKEventMessage(message, 'info');
                    //res=clip_k.components[a].properties[4].getValue(0);
                    //message=' _4_ ='+res;
                    //app.setSDKEventMessage(message, 'info');
                    //res=clip_k.components[a].properties[5].getValue(0);
                    //message=' _5_ ='+res;
                    //app.setSDKEventMessage(message, 'info');
                    //res=clip_k.components[a].properties[7].getValue(0);
                    //message=' _7_ ='+res;
                    //app.setSDKEventMessage(message, 'info');
                    
                    clip_k.components[a].properties[3].setValue(false);
                    clip_k.components[a].properties[4].setValue(1);
                    clip_k.components[a].properties[5].setValue(0);
                    clip_k.components[a].properties[7].setValue(1);
                    }
                }
//
                cc=cc+1;
                }
            if (vTrack.clips[k].end.seconds > ep_end_time)
                {
                last_clip=k;
//                message='upto='+k;
//                app.setSDKEventMessage(message, 'info');
                break;
                }
            }
        }
    
    }
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
}

function upper_scenes_length() {
    var tick_const=10160640000;

  var proj = app.project;
    message='clips count';
	app.setSDKEventMessage(message, 'info');

    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
        }
    var outputPath			= Folder.selectDialog("Choose the output directory");
    var report_file = new File(outputPath + encodeURI("/report.csv"));
    message='file'+report_file;
    app.setSDKEventMessage(message, 'info');
    report_file.open("w")
    clips=vTrack.clips.numItems
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    message="clip ; duration (frames)  \n";
    report_file.write(message);
    for (var i = 0; i < clips; i++) {
        start=vTrack.clips[i].start.ticks;
        end=vTrack.clips[i].end.ticks;
        length=(end-start)/tick_const;
        message=vTrack.clips[i].name +" ; "+length +"\n";
        message=message.replace(".",",")
        app.setSDKEventMessage(message, 'info');
        report_file.write(message);
   }
report_file.close();  

}



function export_by_upper_track(prof_name)  
    {
    var proj = app.project;
    message='export_by_upper_track';
	app.setSDKEventMessage(message, 'info');
    ver=app.version.substring(0,2);
    //message="%USERPROFILE%"+"\\Documents\\Adobe\\Adobe Media Encoder\\"+ver+".0\\Presets"
    if (prof_name == "") { prof_name="prof.epr" }
    epr_path=$.getenv('USERPROFILE')+"\\Documents\\Adobe\\Adobe Media Encoder\\"+ver+".0\\Presets\\"+prof_name;
    app.setSDKEventMessage(epr_path, 'info');


	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
        }
    clips=vTrack.clips.numItems
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    outPreset		= new File(epr_path);
    var format_ext=activeSequence.getExportFileExtension(outPreset.fsName);

    message='ext='+format_ext;
    app.setSDKEventMessage(message, 'info');
    var i=0;
    var outputPath			= Folder.selectDialog("Choose the output directory");
    for (i = 0; i < clips; i++) {
        message='clip num: '+i;
        app.setSDKEventMessage(message, 'info')
        start=vTrack.clips[i].start.seconds;
        end=vTrack.clips[i].end.seconds;
        //message=string(start);
        //app.setSDKEventMessage(message, 'info');
        //message=string(end);
        //app.setSDKEventMessage(message, 'info');
        activeSequence.setInPoint(start);
        activeSequence.setOutPoint(end);
        name=outputPath.fsName+"\\"+vTrack.clips[i].name+"."+format_ext;
        message=name;
        app.setSDKEventMessage(message, 'info');
        activeSequence.exportAsMediaDirect(name, epr_path, app.encoder.ENCODE_IN_TO_OUT)
        }

    }
}  

function scenes_prosto() {
    app.enableQE();  
    var proj = app.project;
	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack_ep = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-2];
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
        }
    clips_ep=vTrack_ep.clips.numItems
    clips=vTrack.clips.numItems
    last_clip=0;
 for (var i = 0; i < clips_ep; i++) {
        j=i+1;
       num=j;
        if (j< 10) num="0" + j;
        if(j<100 && j>9) num=j;
        vTrack_ep.clips[i].name="ep"+num;
        
        var ep_name=app.project.activeSequence.name+"_"+num;
        ep_start_time= vTrack_ep.clips[i].start.seconds;
        ep_end_time= vTrack_ep.clips[i].end.seconds;
        
        for ( var k=last_clip; k <clips; k++)
            {
            if ( (vTrack.clips[k].end.seconds <= ep_end_time) && (vTrack.clips[k].start.seconds >= ep_start_time) )
                {
                l=1+k;
                num=l;
                if (l< 10) num="00" + l;
                if  (l<100 && l>9) num="0" + l;
                vTrack.clips[k].name=ep_name+"_"+num;
               }
            if (vTrack.clips[k].end.seconds > ep_end_time)
               {
               last_clip=k;
               break;
               }
            }
        }
    
        tr=activeSequence.videoTracks.numTracks-1;

        for (var i = 0; i < clips; i++) {
                var clip_qe = qe.project.getActiveSequence().getVideoTrackAt(tr).getItemAt(i);
                if(clip_qe.type=="Clip"){
                clip_qe.addVideoEffect(qe.project.getVideoEffectByName("Clip Name"));
                clip_qe.addVideoEffect(qe.project.getVideoEffectByName("Timecode"));
                    }
                else
                {
                clips=clips+1;
                 }
         }
         clips=vTrack.clips.numItems 
        for (var i = 0; i < clips; i++) {                 
                clip_k=vTrack.clips[i];
                for (var a = 0;a<clip_k.components.numItems;a++){
                    if( clip_k.components[a].displayName == "Clip Name")
                    {
                    x=clip_k.components[a].properties[0].getValue()[0];
                    y=clip_k.components[a].properties[0].getValue()[1];
                    clip_k.components[a].properties[0].setValue([x*(0.2),y*(0.1)]);
                    clip_k.components[a].properties[2].setValue(47);
                    }
                    if( clip_k.components[a].displayName == "Timecode")
                    {
                    x=clip_k.components[a].properties[0].getValue()[0];
                    y=clip_k.components[a].properties[0].getValue()[1];
                    clip_k.components[a].properties[0].setValue([x*0.25,y*1.05]);
                    clip_k.components[a].properties[1].setValue(47);
                    clip_k.components[a].properties[3].setValue(false);
                    clip_k.components[a].properties[4].setValue(1);
                    clip_k.components[a].properties[5].setValue(0);
                    clip_k.components[a].properties[7].setValue(1);
                    }
               }
           }
           
    
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    }
}    
    

function scenes_enotki_short() {
    app.enableQE(); 
//	qe.setDebugDatabaseEntry("ScriptLayerPPro.EnableNewWorld", "false");
//	qe.setDebugDatabaseEntry("dvascripting.EnabledInternalDOM", "false");
//	ver=app.version.substring(0,2);
    var proj = app.project;
	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack_ep = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-2];
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
        }
    clips_ep=vTrack_ep.clips.numItems
    clips=vTrack.clips.numItems
    last_clip=0;
    cc=0;
	var ep_name=app.project.activeSequence.name
    for (var i = 0; i < clips_ep; i++) {
        j=i+1;
        num=j;
        if (j< 10) num="0" + j;
        if  (j<100 && j>9) num= j;
        vTrack_ep.clips[i].name="ep"+num;
     //   var ep_name="sc"+num;
        ep_start_time= vTrack_ep.clips[i].start.seconds;
        ep_end_time= vTrack_ep.clips[i].end.seconds;
        cc=0;
        
        for ( var k=last_clip; k <clips; k++)
            {
            if ( (vTrack.clips[k].end.seconds <= ep_end_time) && (vTrack.clips[k].start.seconds >= ep_start_time) )
                {
                l=++cc;
                num=l;
                if (l< 10) num="00" + l + "0";
                if  (l<100 && l>9) num="0" + l + "0";
                vTrack.clips[k].name= ep_name +"_"+num;
                }
                //cc=cc+1;
             if (vTrack.clips[k].end.seconds > ep_end_time)
                {
                last_clip=k;
                break;
                }   
            }
        }
//---------------
 tr=activeSequence.videoTracks.numTracks-1;
        for (var i=0; i < clips; i++) {
                var clip_qe = qe.project.getActiveSequence().getVideoTrackAt(tr).getItemAt(i);
                if(clip_qe.type=="Clip"){
                clip_qe.addVideoEffect(qe.project.getVideoEffectByName("Clip Name"));
                clip_qe.addVideoEffect(qe.project.getVideoEffectByName("Timecode"));
                    }
                else
                {
                clips=clips+1;
                 }
        }
        clips=vTrack.clips.numItems;
        for (var i = 0; i < clips; i++) {                 
                clip_k=vTrack.clips[i];
                for (var a = 0;a<clip_k.components.numItems;a++){
                    if( clip_k.components[a].displayName == "Clip Name")
                    {
                    x=clip_k.components[a].properties[0].getValue()[0];
                    y=clip_k.components[a].properties[0].getValue()[1];
                    clip_k.components[a].properties[0].setValue([x*0.18,y*0.05]);
					clip_k.components[a].properties[2].setValue(40);
                    }
                    if( clip_k.components[a].displayName == "Timecode")
                    {
                    x=clip_k.components[a].properties[0].getValue()[0];
                    y=clip_k.components[a].properties[0].getValue()[1];
                    clip_k.components[a].properties[0].setValue([x*0.45,y*0.05]);
                    clip_k.components[a].properties[1].setValue(40);
                    clip_k.components[a].properties[3].setValue(false);
                    clip_k.components[a].properties[4].setValue(1);
                    clip_k.components[a].properties[5].setValue(0);
                    clip_k.components[a].properties[7].setValue(1);
                    }
                }

//--------
            }
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    }

}


function export_by_upper_track_filename(prof_name)  
    {
    var proj = app.project;
    message='export_by_upper_track';
	app.setSDKEventMessage(message, 'info');
    ver=app.version.substring(0,2);
    //message="%USERPROFILE%"+"\\Documents\\Adobe\\Adobe Media Encoder\\"+ver+".0\\Presets"
    if (prof_name == "") { prof_name="prof.epr" }
    epr_path=$.getenv('USERPROFILE')+"\\Documents\\Adobe\\Adobe Media Encoder\\"+ver+".0\\Presets\\"+prof_name;
    app.setSDKEventMessage(epr_path, 'info');


	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
            var fTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-2];
        }
    clips=vTrack.clips.numItems;
    fclips=fTrack.clips.numItems;
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    outPreset		= new File(epr_path);
    var format_ext=activeSequence.getExportFileExtension(outPreset.fsName);

    message='ext='+format_ext;
    app.setSDKEventMessage(message, 'info');
    
    var outputPath			= Folder.selectDialog("Choose the output directory");
    for (var i = 0; i < clips; i++) {
        start=vTrack.clips[i].start.seconds;
        end=vTrack.clips[i].end.seconds;
        message=start;
        app.setSDKEventMessage(message, 'info');
        message=end;
        app.setSDKEventMessage(message, 'info');
        activeSequence.setInPoint(start);
        activeSequence.setOutPoint(end);
        var fname="not_name";
        for (var j = 0; j < fclips; j++)
            {
            if ((fTrack.clips[j].start.seconds >= start) && (fTrack.clips[j].end.seconds <= end))
                {
                app.setSDKEventMessage(fTrack.clips[j].start.seconds, 'info');
                app.setSDKEventMessage(fTrack.clips[j].end.seconds, 'info');
                tmp_name=fTrack.clips[j].name.split(".");
                fname=tmp_name[0]
                break;
                }
                
            }
        name=outputPath.fsName+"\\"+fname+"."+format_ext;
        message=name;
        app.setSDKEventMessage(message, 'info');
        activeSequence.exportAsMediaDirect(name, epr_path, app.encoder.ENCODE_IN_TO_OUT)
        }

    }
}  

function lazy_sc_layer() {
app.enableQE();  
time_tick=254016000000;

var seq = app.project.activeSequence;
fps=time_tick/seq.timebase;
var res=qe.project.newTransparentVideo(seq.frameSizeHorizontal,seq.frameSizeVertical,fps,1.0,1.0); 
var numVTracks = seq.videoTracks.numTracks;
var targetVTrack = seq.videoTracks[(numVTracks - 1)];
    
var bin_items=app.project.rootItem.children.numItems;
for (var i = 0; i < bin_items; i++) {
    transparent = app.project.rootItem.children[i];
    if (transparent.name=="Transparent Video") {
            break;
            }
    }
    
transparent.setColorLabel(transparent.getColorLabel()+1);

var clipVTrack = seq.videoTracks[(numVTracks - 3)];
clipnum = clipVTrack.clips.numItems;


for (var i = 0; i < clipnum; i++) {    
    start=clipVTrack.clips[i].start;
    end=clipVTrack.clips[i].end;
   transparent.setOutPoint(end,0);
   transparent.setInPoint(start,0);
    targetVTrack.overwriteClip(transparent, start.seconds);
    }
}


function lazy_ep_layer() {
app.enableQE();  
time_tick=254016000000;

var seq = app.project.activeSequence;
fps=time_tick/seq.timebase;
var res=qe.project.newTransparentVideo(seq.frameSizeHorizontal,seq.frameSizeVertical,fps,1.0,1.0); 
var numVTracks = seq.videoTracks.numTracks;
var targetVTrack = seq.videoTracks[(numVTracks - 2)];
    
var bin_items=app.project.rootItem.children.numItems;
for (var i = 0; i < bin_items; i++) {
    transparent = app.project.rootItem.children[i];
    if (transparent.name=="Transparent Video") {
            break;
            }
    }
var clipVTrack = seq.videoTracks[(numVTracks - 3)];
clipnum = clipVTrack.clips.numItems;

   start=clipVTrack.clips[0].start;
   end=clipVTrack.clips[clipnum-1].end;
   transparent.setOutPoint(end,0);
   transparent.setInPoint(start,0);
   transparent.setColorLabel(transparent.getColorLabel()+1);
   targetVTrack.overwriteClip(transparent, start.seconds);
   targetVTrack.clips[0].name="ep01";
}

function scenes_enotki_full() {
    app.enableQE();  
    var proj = app.project;
	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack_ep = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-2];
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
        }
    clips_ep=vTrack_ep.clips.numItems
    clips=vTrack.clips.numItems
    last_clip=0;
    cc=0;
    for (var i = 0; i < clips_ep; i++) {
        j=i+1;
        num=j;
        if (j< 10) num="0" + j;
        if  (j<100 && j>9) num= j;
        vTrack_ep.clips[i].name="ep"+num;
        var ep_name=app.project.activeSequence.name + "_sc"+num;
        ep_start_time= vTrack_ep.clips[i].start.seconds;
        ep_end_time= vTrack_ep.clips[i].end.seconds;
        cc=0;
        
        for ( var k=last_clip; k <clips; k++)
            {
            if ( (vTrack.clips[k].end.seconds <= ep_end_time) && (vTrack.clips[k].start.seconds >= ep_start_time) )
                {
                l=++cc;
                num=l;
                if (l< 10) num="00" + l + "0" + "_animatic_v01";
                if  (l<100 && l>9) num="0" + l + "0" + "_animatic_v01";
                vTrack.clips[k].name=ep_name+"_"+num;
                }
                //cc=cc+1;
             if (vTrack.clips[k].end.seconds > ep_end_time)
                {
                last_clip=k;
                break;
                }   
            }
        }
        


//

    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    }
}

function scenes_cow() {
    app.enableQE();  
    var proj = app.project;
	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack_ep = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-2];
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
        }
    clips_ep=vTrack_ep.clips.numItems
    clips=vTrack.clips.numItems
    last_clip=0;
    cc=0;
    for (var i = 0; i < clips_ep; i++) {
        j=i+1;
        num=j;
        if (j< 10) num="00" + j;
        if  (j<100 && j>9) num="0" + j;
        vTrack_ep.clips[i].name="ep"+num;
        var ep_name="ep"+num;
        ep_start_time= vTrack_ep.clips[i].start.seconds;
        ep_end_time= vTrack_ep.clips[i].end.seconds;
        cc=0;
        
        for ( var k=last_clip; k <clips; k++)
        //for ( var k=0; k <clips; k++)
            {
            if ( (vTrack.clips[k].end.seconds <= ep_end_time) && (vTrack.clips[k].start.seconds >= ep_start_time) )
                {
                l=++cc;
                num=l;
                if (l< 10) num="00" + l;
                if  (l<100 && l>9) num="0" + l;
                vTrack.clips[k].name=ep_name+"sc"+num;
                }
                //cc=cc+1;
             if (vTrack.clips[k].end.seconds > ep_end_time)
                {
                last_clip=k;
                break;
                }   
            }
        }
        
        tr=activeSequence.videoTracks.numTracks-1;
        for (var i=0; i < clips; i++) {
                var clip_qe = qe.project.getActiveSequence().getVideoTrackAt(tr).getItemAt(i);
                if(clip_qe.type=="Clip"){
                clip_qe.addVideoEffect(qe.project.getVideoEffectByName("Clip Name"));
                clip_qe.addVideoEffect(qe.project.getVideoEffectByName("Timecode"));
                    }
                else
               {
                clips=clips+1;
                 }
        }
        clips=vTrack.clips.numItems;
        for (var i = 0; i < clips; i++) {                 
                clip_k=vTrack.clips[i];
                for (var a = 0;a<clip_k.components.numItems;a++){
                    if( clip_k.components[a].displayName == "Clip Name")
                    {
                    x=clip_k.components[a].properties[0].getValue()[0];
                    y=clip_k.components[a].properties[0].getValue()[1];
                    clip_k.components[a].properties[0].setValue([x*0.18,y*0.05]);
					clip_k.components[a].properties[2].setValue(40);
                    }
                    if( clip_k.components[a].displayName == "Timecode")
                    {
                    x=clip_k.components[a].properties[0].getValue()[0];
                    y=clip_k.components[a].properties[0].getValue()[1];
                    clip_k.components[a].properties[0].setValue([x*0.45,y*0.05]);
                    clip_k.components[a].properties[1].setValue(40);
                    clip_k.components[a].properties[3].setValue(false);
                    clip_k.components[a].properties[4].setValue(1);
                    clip_k.components[a].properties[5].setValue(0);
                    clip_k.components[a].properties[7].setValue(1);
                    }
                }

            }
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    }
    
}

function scenes_sg() {
    app.enableQE();  
    var proj = app.project;
	if (!app.project.rootItem) return "rootItem is not available";
    {
    var activeSequence = app.project.activeSequence;
		if (activeSequence) {
            var foundTarget = false;
            var vTrack_ep = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-1];
            var vTrack = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-2];
            var vTrack_scenes = activeSequence.videoTracks[activeSequence.videoTracks.numTracks-3];
        }
    clips_ep=vTrack_ep.clips.numItems
    clips=vTrack.clips.numItems
    last_clip=0;
    cc=0;
    for (var i = 0; i < clips_ep; i++) {
        j=i+1;
        num=j;
        if (j< 10) num="00" + j;
        if  (j<100 && j>9) num="0" + j;
        vTrack_ep.clips[i].name="sq"+num;
        var ep_name="sq"+num;
        ep_start_time= vTrack_ep.clips[i].start.seconds;
        ep_end_time= vTrack_ep.clips[i].end.seconds;
        cc=0;
        
        for ( var k=last_clip; k <clips; k++)
            {
            if ( (vTrack.clips[k].end.seconds <= ep_end_time) && (vTrack.clips[k].start.seconds >= ep_start_time) )
                {
                l=++cc;
                num=l;
                if (l< 10) num="00" + l;
                if  (l<100 && l>9) num="0" + l;
                vTrack.clips[k].name="sh"+num+"0";
                vTrack_scenes.clips[k].name="sh"+num+"0";
                }
             if (vTrack.clips[k].end.seconds > ep_end_time)
                {
                last_clip=k;
                break;
                }   
            }
        }
        
    message='clips'+clips;
    app.setSDKEventMessage(message, 'info');
    }
}
     
function export_json() {
        if (app.project.activeSequence) {

            var projPath            = new File(app.project.path);
            var parentDir           = projPath.parent;
            var outputName          = app.project.name.replace('.prproj', '');
            var jsonExtension       = '.json';
            //var outputPath        = Folder.selectDialog("Choose the output directory");
            var completeOutputPath  = parentDir + "/../json/" + outputName + jsonExtension;
            

            //sequences parse//
            var seq = [];
            var tempSeqName = [];
            //app.setSDKEventMessage("here work", 'info');
            //app.setSDKEventMessage("Not working", 'info');
            
            for (var i = 0; i < app.project.activeSequence.videoTracks[1].clips.numItems; i++){
                
                seq.push({name: app.project.activeSequence.videoTracks[1].clips[i].name,
                        start:  app.project.activeSequence.videoTracks[1].clips[i].start.ticks/parseInt(app.project.activeSequence.timebase),
                        end:    app.project.activeSequence.videoTracks[1].clips[i].end.ticks/parseInt(app.project.activeSequence.timebase)});

            }
            

            //shots parse//
            var sh  = [];

            for (var i = 0; i < app.project.activeSequence.videoTracks[0].clips.numItems; i++){
                
                sh.push({name: app.project.activeSequence.videoTracks[0].clips[i].name,
                        start: app.project.activeSequence.videoTracks[0].clips[i].start.ticks/parseInt(app.project.activeSequence.timebase),
                        end:   app.project.activeSequence.videoTracks[0].clips[i].end.ticks/parseInt(app.project.activeSequence.timebase)});
            }


            //sequences check//
            var seqMask         = /\bsq\d\d\d\b/;
            var seqNamingErr    = false;
            var seqOrderErr     = false;
            var seqGapsErr      = false;
            

            for (var i = 0; i < seq.length; i++){

                if (!seqMask.test(seq[i].name)){

                    seqNamingErr = true;
                    app.setSDKEventMessage("Error - sequence '" + seq[i].name + "' wrong naming", 'info');
                }
                else if (i + 1 !== parseInt(seq[i].name.replace('sq',''))){
                    
                    seqOrderErr = true;
                    app.setSDKEventMessage("Warning - sequence '" + seq[i].name + "' wrong order", 'info');
                }

                if (i + 1 < seq.length && seq[i].end < seq[i+1].start){
                    
                    seqGapsErr = true;
                    app.setSDKEventMessage("Error - gap between '" + seq[i].name + "' and '" + seq[i+1].name + "'", 'info');
                }
            }

            



            //shots check//
            var shMask      = /\bsh\d\d\d\d\b/;
            var shNameErr   = false;
            var shGapsErr   = false;

            for(var i = 0; i < sh.length; i++){

                if (!shMask.test(sh[i].name)){
                    shNameErr = true;
                    app.setSDKEventMessage("Error - shot '" + sh[i].name + "' wrong naming", 'info');
                }
                if (i + 1 < sh.length && sh[i].end < sh[i+1].start){
                    shGapsErr = true
                    app.setSDKEventMessage("Error - gap between '" + sh[i].name + "' and '" + sh[i+1].name + "'", 'info')
                }
            }


            //seqence-shots matching, shots order check//
            var fullMatching    = true;
            var startMatching   = false;
            var endMatching     = false;
            var shOrderErr      = false;
            var startPos        = 0;
            var endPos          = 0;
            
            for(var i = 0; i < seq.length; i++)
            {
                startMatching = false;
                endMatching = false;

                for(var j = endPos; j < sh.length; j++)
                {

                    if(seq[i].start == sh[j].start){
                        startMatching = true;
                        startPos = j;
                    }

                    if(seq[i].end == sh[j].end){
                        endMatching = true;
                        endPos = j;
                    }

                    if(startMatching & endMatching){

                        var n = 10;

                        for(startPos; startPos <= endPos; startPos++){
                            
                            if (n !== parseInt(sh[startPos].name.replace('sh',''), 10)){
                                shOrderErr = true;
                                app.setSDKEventMessage("Warning - shot '" + sh[startPos].name + "' wrong order in sequence '" + seq[i].name + "'", 'info');
                            }
                            n += 10;
                        }
                        break;
                    }

                    if(j + 1 == sh.length & (!startMatching | !endMatching)){
                        fullMatching = false;
                        app.setSDKEventMessage("Error - seqences and shots don't match", 'info');
                    }

                    if(!fullMatching) //all seqence-shots match
                    {
                        break;
                    }
                }
            }
            
            //duplicated names check//
            if(!seqNamingErr){
                var seqSortNames        = [];
                var seqDupNames         = [];
                var seqAlredyRepited    = false;
                var seqDup              = false;

                for (var i = 0; i < app.project.activeSequence.videoTracks[1].clips.numItems; i++){
                    seqSortNames.push(parseInt(seq[i].name.replace('sq','')));
                }

                seqSortNames.sort(function(a, b){return a - b});

                // for (var i = 0; i < seqSortNames.length; i++){
                //     app.setSDKEventMessage(seqSortNames[i].toString(), 'info');
                // }

                for (var i = 1; i < seqSortNames.length; i++){
                    if (seqSortNames[i] == seqSortNames[i-1]){
                        if (!seqAlredyRepited){
                            seqDupNames.push(seqSortNames[i]);
                            seqAlredyRepited = true;
                            seqDup = true;
                        }
                    }
                    else seqAlredyRepited = false;
                }

                for (var i = 0; i < seqDupNames.length; i++){
                    app.setSDKEventMessage("Error - duplicated sequence name 'sq" + (seqDupNames[i]/1000).toString().replace('0.','') + "'", 'info');
                }
            }
            // !shNameErr & fullMatching
            if(true){
                var shSortNames         = [];
                var shDupNames          = [];
                var shAlredyRepited     = false;
                var shDup               = false;
                startPos                = 0;
                endPos                  = 0;

                for(var i = 0; i < seq.length; i++){

                    startMatching = false;
                    endMatching = false;

                    for(var j = 0; j < sh.length; j++)
                    {

                        if(seq[i].start == sh[j].start){
                            startMatching = true;
                            startPos = j;
                        }

                        if(seq[i].end == sh[j].end){
                            endMatching = true;
                            endPos = j;
                        }

                        if(startMatching & endMatching){

                            shAlredyRepited = false;

                            for(var k = startPos; k <= endPos; k++){
                                shSortNames.push(parseInt(sh[k].name.replace('sh',''), 10))
                            }

                            shSortNames.sort(function(a, b){return a - b});

                            for (var k = 1 ; k < shSortNames.length; k++){
                                if (shSortNames[k] == shSortNames[k-1]){
                                    if (!shAlredyRepited){
                                        shDupNames.push(shSortNames[k]);
                                        shAlredyRepited = true;
                                        shDup = true;
                                    }
                                }
                                else shAlredyRepited = false;
                            }

                            for (var k = 0; k < shDupNames.length; k++){
                                app.setSDKEventMessage("Error - duplicated shot name in sequence '" + seq[i].name + "'", 'info');
                            }
                            shSortNames = [];
                            shDupNames  = [];

                            break;
                        }
                    }
                }
            }


            var data = {sequences: seq, shots: sh};

            if (!seqNamingErr & !shNameErr & !seqGapsErr & !shGapsErr & fullMatching & !seqDup & !shDup){
                message                 = completeOutputPath + "   saved successfully";
                var file                = new File(completeOutputPath);
                file.open("w");
                file.write(JSON.stringify(data));
                file.close();
                app.setSDKEventMessage(message, 'info');
            }
        }
}