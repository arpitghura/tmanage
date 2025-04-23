export const invitationTemplate = (email:string, organizationId:string, invitation_token:string | undefined, isTeam: Boolean) => {
    const invitationToken = invitation_token || "";
    const userName = email.split('@')[0];
    const organizationName = organizationId;
    const greeting = `Hello, ${userName}`;

    return `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
 <meta charset="UTF-8" />
 <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
 <!--[if !mso]><!-- -->
 <meta http-equiv="X-UA-Compatible" content="IE=edge" />
 <!--<![endif]-->
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <meta name="format-detection" content="telephone=no" />
 <meta name="format-detection" content="date=no" />
 <meta name="format-detection" content="address=no" />
 <meta name="format-detection" content="email=no" />
 <meta name="x-apple-disable-message-reformatting" />
 <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:ital,wght@0,400;0,400;0,500;0,600" rel="stylesheet" />
 <title>Invitation to join the ${isTeam ? "Team" : "Organization"}</title>
 <!-- Made with Postcards Email Builder by Designmodo -->
 <style>
 html,
         body {
             margin: 0 !important;
             padding: 0 !important;
             min-height: 100% !important;
             width: 100% !important;
             -webkit-font-smoothing: antialiased;
         }
 
         * {
             -ms-text-size-adjust: 100%;
         }
 
         #outlook a {
             padding: 0;
         }
 
         .ReadMsgBody,
         .ExternalClass {
             width: 100%;
         }
 
         .ExternalClass,
         .ExternalClass p,
         .ExternalClass td,
         .ExternalClass div,
         .ExternalClass span,
         .ExternalClass font {
             line-height: 100%;
         }
 
         table,
         td,
         th {
             mso-table-lspace: 0 !important;
             mso-table-rspace: 0 !important;
             border-collapse: collapse;
         }
 
         u + .body table, u + .body td, u + .body th {
             will-change: transform;
         }
 
         body, td, th, p, div, li, a, span {
             -webkit-text-size-adjust: 100%;
             -ms-text-size-adjust: 100%;
             mso-line-height-rule: exactly;
         }
 
         img {
             border: 0;
             outline: 0;
             line-height: 100%;
             text-decoration: none;
             -ms-interpolation-mode: bicubic;
         }
 
         a[x-apple-data-detectors] {
             color: inherit !important;
             text-decoration: none !important;
         }
 
         .pc-gmail-fix {
             display: none;
             display: none !important;
         }
 
         .body .pc-project-body {
             background-color: transparent !important;
         }
 
         @media (min-width: 621px) {
             .pc-lg-hide {
                 display: none;
             } 
 
             .pc-lg-bg-img-hide {
                 background-image: none !important;
             }
         }
 </style>
 <style>
 @media (max-width: 620px) {
 .pc-project-body {min-width: 0px !important;}
 .pc-project-container {width: 100% !important;}
 .pc-sm-hide {display: none !important;}
 .pc-sm-bg-img-hide {background-image: none !important;}
 .pc-w620-itemsSpacings-0-30 {padding-left: 0px !important;padding-right: 0px !important;padding-top: 15px !important;padding-bottom: 15px !important;}
 .pc-w620-valign-middle {vertical-align: middle !important;}
 td.pc-w620-halign-left,th.pc-w620-halign-left {text-align: left !important;}
 table.pc-w620-halign-left {float: none !important;margin-right: auto !important;margin-left: 0 !important;}
 img.pc-w620-halign-left {margin-right: auto !important;margin-left: 0 !important;}
 div.pc-w620-textAlign-left,th.pc-w620-textAlign-left,a.pc-w620-textAlign-left,td.pc-w620-textAlign-left {text-align: left !important;text-align-last: left !important;}
 table.pc-w620-textAlign-left{float: none !important;margin-right: auto !important;margin-left: 0 !important;}
 img.pc-w620-textAlign-left{margin-right: auto !important;margin-left: 0 !important;}
 .pc-w620-text-align-left {text-align: left !important;text-align-last: left !important;}
 .pc-w620-width-100pc {width: 100% !important;}
 .pc-w620-height-auto {height: auto !important;}
 .pc-w620-padding-30-30-30-30 {padding: 30px 30px 30px 30px !important;}
 table.pc-w620-spacing-0-0-15-0 {margin: 0px 0px 15px 0px !important;}
 td.pc-w620-spacing-0-0-15-0,th.pc-w620-spacing-0-0-15-0{margin: 0 !important;padding: 0px 0px 15px 0px !important;}
 .pc-w620-padding-10-24-10-24 {padding: 10px 24px 10px 24px !important;}
 div.pc-w620-align-center,th.pc-w620-align-center,a.pc-w620-align-center,td.pc-w620-align-center {text-align: center !important;text-align-last: center !important;}
 table.pc-w620-align-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
 img.pc-w620-align-center {margin-right: auto !important;margin-left: auto !important;}
 div.pc-w620-textAlign-center,th.pc-w620-textAlign-center,a.pc-w620-textAlign-center,td.pc-w620-textAlign-center {text-align: center !important;text-align-last: center !important;}
 table.pc-w620-textAlign-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
 img.pc-w620-textAlign-center {margin-right: auto !important;margin-left: auto !important;}
 .pc-w620-text-align-center {text-align: center !important;text-align-last: center !important;}
 table.pc-w620-spacing-0-0-0-0 {margin: 0px 0px 0px 0px !important;}
 td.pc-w620-spacing-0-0-0-0,th.pc-w620-spacing-0-0-0-0{margin: 0 !important;padding: 0px 0px 0px 0px !important;}
 .pc-w620-height-1 {height: 1px !important;}
 .pc-w620-itemsSpacings-20-30 {padding-left: 10px !important;padding-right: 10px !important;padding-top: 15px !important;padding-bottom: 15px !important;}
 .pc-w620-itemsSpacings-20-0 {padding-left: 10px !important;padding-right: 10px !important;padding-top: 0px !important;padding-bottom: 0px !important;}
 td.pc-w620-halign-center,th.pc-w620-halign-center {text-align: center !important;}
 table.pc-w620-halign-center {float: none !important;margin-right: auto !important;margin-left: auto !important;}
 img.pc-w620-halign-center {margin-right: auto !important;margin-left: auto !important;}
 
 .pc-w620-gridCollapsed-1 > tbody,.pc-w620-gridCollapsed-1 > tbody > tr,.pc-w620-gridCollapsed-1 > tr {display: inline-block !important;}
 .pc-w620-gridCollapsed-1.pc-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-width-fill > tr {width: 100% !important;}
 .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
 .pc-w620-gridCollapsed-1 > tbody > tr > td,.pc-w620-gridCollapsed-1 > tr > td {display: block !important;width: auto !important;padding-left: 0 !important;padding-right: 0 !important;margin-left: 0 !important;}
 .pc-w620-gridCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-width-fill > tr > td {width: 100% !important;}
 .pc-w620-gridCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-gridCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;}
 .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-first > .pc-grid-td-first,pc-w620-gridCollapsed-1 > .pc-grid-tr-first > .pc-grid-td-first {padding-top: 0 !important;}
 .pc-w620-gridCollapsed-1 > tbody > .pc-grid-tr-last > .pc-grid-td-last,pc-w620-gridCollapsed-1 > .pc-grid-tr-last > .pc-grid-td-last {padding-bottom: 0 !important;}
 
 .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-first > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-first > td {padding-top: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > .pc-grid-tr-last > td,.pc-w620-gridCollapsed-0 > .pc-grid-tr-last > td {padding-bottom: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-first,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-first {padding-left: 0 !important;}
 .pc-w620-gridCollapsed-0 > tbody > tr > .pc-grid-td-last,.pc-w620-gridCollapsed-0 > tr > .pc-grid-td-last {padding-right: 0 !important;}
 
 .pc-w620-tableCollapsed-1 > tbody,.pc-w620-tableCollapsed-1 > tbody > tr,.pc-w620-tableCollapsed-1 > tr {display: block !important;}
 .pc-w620-tableCollapsed-1.pc-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-width-fill > tr {width: 100% !important;}
 .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr {width: 100% !important;}
 .pc-w620-tableCollapsed-1 > tbody > tr > td,.pc-w620-tableCollapsed-1 > tr > td {display: block !important;width: auto !important;}
 .pc-w620-tableCollapsed-1.pc-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
 .pc-w620-tableCollapsed-1.pc-w620-width-fill > tbody > tr > td,.pc-w620-tableCollapsed-1.pc-w620-width-fill > tr > td {width: 100% !important;box-sizing: border-box !important;}
 }
 </style>
 <!--[if !mso]><!-- -->
 <style>
 @font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 500; src: url('https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjSL9AI9scg.woff') format('woff'), url('https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjSL9AI9sdA.woff2') format('woff2'); } @font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 400; src: url('https://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKhd_eEw.woff') format('woff'), url('https://fonts.gstatic.com/s/ibmplexsans/v19/zYXgKVElMYYaJe8bpLHnCwDKhd_eFQ.woff2') format('woff2'); } @font-face { font-family: 'IBM Plex Sans'; font-style: normal; font-weight: 600; src: url('https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI9scg.woff') format('woff'), url('https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76AI9sdA.woff2') format('woff2'); }
 </style>
 <!--<![endif]-->
 <!--[if mso]>
    <style type="text/css">
        .pc-font-alt {
            font-family: Arial, Helvetica, sans-serif !important;
        }
    </style>
    <![endif]-->
 <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
</head>

<body class="body pc-font-alt" style="width: 100% !important; min-height: 100% !important; margin: 0 !important; padding: 0 !important; line-height: 1.5; color: #2D3A41; mso-line-height-rule: exactly; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-variant-ligatures: normal; text-rendering: optimizeLegibility; -moz-osx-font-smoothing: grayscale; background-color: #f8f7ff;" bgcolor="#f8f7ff">
 <span style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">TManage

You have invited to join the ${isTeam ? "Team" : "Organization"}.</span>
 <!--[if !gte mso 9]><!-- -->
 <div style="display: none; max-height: 0px; overflow: hidden;">
  &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279; &#847; &zwnj; &nbsp; &#8199; &#65279;
 </div>
 <!--<![endif]-->
 <table class="pc-project-body" style="table-layout: fixed; min-width: 600px; background-color: #f8f7ff;" bgcolor="#f8f7ff" width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
  <tr>
   <td align="center" valign="top">
    <table class="pc-project-container" align="center" width="600" style="width: 600px; max-width: 600px;" border="0" cellpadding="0" cellspacing="0" role="presentation">
     <tr>
      <td style="padding: 20px 0px 20px 0px;" align="left" valign="top">
       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="width: 100%;">
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Header -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td class="pc-w620-spacing-0-0-15-0" style="padding: 0px 0px 15px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <!--[if !gte mso 9]><!-- -->
               <td valign="top" class="pc-w620-padding-30-30-30-30" style="background-image: url('https://cloudfilesdm.com/postcards/image-172331259259710.png'); background-size: cover; background-position: center right; background-repeat: no-repeat; padding: 30px 48px 30px 48px; border-radius: 10px 10px 10px 10px; background-color: #6558de;" bgcolor="#6558de" background="https://cloudfilesdm.com/postcards/image-172331259259710.png">
                <!--<![endif]-->
                <!--[if gte mso 9]>
                <td valign="top" align="center" style="background-image: url('https://cloudfilesdm.com/postcards/image-172331259259710.png'); background-size: cover; background-position: center right; background-repeat: no-repeat; background-color: #6558de; border-radius: 10px 10px 10px 10px;" bgcolor="#6558de" background="https://cloudfilesdm.com/postcards/image-172331259259710.png">
            <![endif]-->
                <!--[if gte mso 9]>
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
                    <v:fill src="https://cloudfilesdm.com/postcards/image-172331259259710.png" color="#6558de" type="frame" size="1,1" aspect="atleast"/>
                    <v:textbox style="mso-fit-shape-to-text: true;" inset="0,0,0,0">
                        <div style="font-size: 0; line-height: 0;">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td style="font-size: 14px; line-height: 1.5;" valign="top">
                                        <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                            <tr>
                                                <td colspan="3" height="30" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td width="48" valign="top" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                                <td valign="top" align="left">
                <![endif]-->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td>
                   <table class="pc-width-fill pc-w620-gridCollapsed-0" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr class="pc-grid-tr-first pc-grid-tr-last">
                     <td class="pc-grid-td-first pc-grid-td-last pc-w620-itemsSpacings-0-30" align="left" valign="middle" style="padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;">
                      <table style="border-collapse: separate; border-spacing: 0; width: 100%; height: 100%;" width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr>
                        <td class="pc-w620-halign-left pc-w620-valign-middle" align="left" valign="middle" style="padding: 0px 0px 0px 0px;">
                         <table class="pc-w620-halign-left" align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                          <tr>
                           <td class="pc-w620-halign-left" align="left" valign="top">
                            <table class="pc-w620-halign-left" width="65%" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td valign="top">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" class="pc-w620-textAlign-left" align="left" style="padding: 0px 0px 20px 0px;">
                                  <div class="pc-font-alt pc-w620-textAlign-left" style="text-decoration: none;">
                                   <div style="text-align:left;text-align-last:left;color:#ffffff;font-size:36px;letter-spacing:-0.03em;font-weight:500;font-style:normal;font-variant-ligatures:normal;">
                                    <div style="margin-bottom: 0px;" class="pc-w620-text-align-left"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 130%; text-decoration: none; text-transform: none;">TManage</span>
                                    </div>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                          <tr>
                           <td class="pc-w620-halign-left" align="left" valign="top">
                            <table class="pc-w620-halign-left pc-w620-width-100pc" width="65%" align="left" border="0" cellpadding="0" cellspacing="0" role="presentation">
                             <tr>
                              <td valign="top">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="left">
                                  <div class="pc-font-alt" style="text-decoration: none;">
                                   <div style="text-align:left;text-align-last:left;color:#ffffff;font-size:36px;letter-spacing:-0.03em;font-weight:500;font-style:normal;font-variant-ligatures:normal;">
                                    <div style="margin-bottom: 0px;" class="pc-w620-text-align-left"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 130%; text-decoration: none; text-transform: none;">You've invited to join the ${isTeam ? "Team" : "Organization"}</span>
                                    </div>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <!--[if gte mso 9]>
                                                </td>
                                                <td width="48" style="line-height: 1px; font-size: 1px;" valign="top">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td colspan="3" height="30" style="line-height: 1px; font-size: 1px;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <p style="margin:0;mso-hide:all"><o:p xmlns:o="urn:schemas-microsoft-com:office:office">&nbsp;</o:p></p>
                    </v:textbox>
                </v:rect>
                <![endif]-->
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
          <!-- END MODULE: Header -->
         </td>
        </tr>
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Text -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <td valign="top" class="pc-w620-padding-30-30-30-30" style="padding: 10px 48px 20px 48px; border-radius: 10px 10px 0px 0px; background-color: #ffffff;" bgcolor="#ffffff">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 8px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="color:#28243d;font-size:17px;letter-spacing:-0.2px;font-weight:600;font-style:normal;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none; text-transform: none;">${greeting}</span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 8px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="color:#28243d;font-size:14px;letter-spacing:-0.2px;font-weight:400;font-style:normal;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none; text-transform: none;">You have been invited to join the ${isTeam ? "Team" : "Organization"} ${organizationName}.</span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 8px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left" style="padding: 10px 0px 0px 0px;">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="color:#28243d;font-size:17px;letter-spacing:0px;font-weight:600;font-style:normal;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none; text-transform: none;">About TManage</span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 16px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="color:#28243d;font-weight:400;font-style:normal;font-size:14px;letter-spacing:-0.2px;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none;">Welcome to TManage, a collaborative platform that helps organizations to manage their entire organization people, and different teams.</span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 8px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left" style="padding: 10px 0px 0px 0px;">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="color:#28243d;font-size:17px;letter-spacing:0px;font-weight:600;font-style:normal;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none; text-transform: none;">Take the First Step</span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 0px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="color:#28243dcc;font-size:14px;letter-spacing:0px;font-weight:400;font-style:normal;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none; text-transform: none;">Someone from your organization has already taken the zeroth step. Now it's your turn to take the first step by joining the organization and helping your team and organization manage great minds like you more conveniently. </span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <th valign="top" class="pc-w620-align-center" align="center" style="padding: 10px 0px 10px 0px; text-align: center; font-weight: normal; line-height: 1;">
                   <!--[if mso]>
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" class="pc-w620-align-center" align="center" width="100%" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
            <tr>
                <td valign="middle" align="center" style="width: 100%; border-radius: 8px; background-color: #6547d1; text-align:center; color: #ffffff; padding: 10px 24px 10px 24px; mso-padding-left-alt: 0; margin-left:24px;" bgcolor="#6547d1">
                                    <a class="pc-font-alt" style="display: inline-block; text-decoration: none; font-variant-ligatures: normal; font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; text-align: center;" href="https://tmanage-ui.vercel.app/?invitationToken=${encodeURIComponent(invitationToken)}" target="_blank"><span style="color:#ffffff;font-size:16px;letter-spacing:0px;font-weight:600;font-style:normal;display: inline-block;font-variant-ligatures:normal;"><span style="display: inline-block; margin-bottom: 0px;" class="pc-w620-text-align-center"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 30px; text-decoration: none; text-transform: uppercase;">Accept Invite</span></span></span></a>
                                </td>
            </tr>
        </table>
        <![endif]-->
                   <!--[if !mso]><!-- -->
                   <a class="pc-w620-textAlign-center pc-w620-padding-10-24-10-24" style="display: inline-block; box-sizing: border-box; border-radius: 8px; background-color: #6547d1; padding: 10px 24px 10px 24px; width: 100%; font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; vertical-align: top; text-align: center; text-align-last: center; text-decoration: none; -webkit-text-size-adjust: none;" href="https://tmanage-ui.vercel.app/" target="_blank"><span style="color:#ffffff;font-size:16px;letter-spacing:0px;font-weight:600;font-style:normal;display: inline-block;font-variant-ligatures:normal;"><span style="display: inline-block; margin-bottom: 0px;" class="pc-w620-text-align-center"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 30px; text-decoration: none; text-transform: uppercase;">Accept Invite</span></span></span></a>
                   <!--<![endif]-->
                  </th>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 8px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="color:#28243dcc;font-size:14px;letter-spacing:0px;font-weight:400;font-style:normal;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none; text-transform: none;">By accepting the invitation, you agree to our Terms and Conditions and our Privacy Policy.</span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top" style="padding: 0px 0px 0px 0px;">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="color:#28243dcc;font-size:14px;letter-spacing:0px;font-weight:400;font-style:normal;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none; text-transform: none;">Thank you for becoming a member of TManage community. </span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
          <!-- END MODULE: Text -->
         </td>
        </tr>
        <tr>
         <td valign="top">
          <!-- BEGIN MODULE: Footer -->
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
           <tr>
            <td class="pc-w620-spacing-0-0-0-0" style="padding: 0px 0px 0px 0px;">
             <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
               <td valign="top" class="pc-w620-padding-30-30-30-30" style="padding: 30px 30px 30px 30px; border-radius: 0px 0px 10px 10px; background-color: #272238;" bgcolor="#272238">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="left" valign="top">
                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" align="left" style="border-collapse: separate; border-spacing: 0; margin-right: auto; margin-left: auto;">
                    <tr>
                     <td valign="top" align="left">
                      <div class="pc-font-alt" style="text-decoration: none;">
                       <div style="text-align:center;text-align-last:center;color:#ffffff;font-size:25px;letter-spacing:-0.2px;font-weight:500;font-style:normal;font-variant-ligatures:normal;">
                        <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 40px; text-decoration: none; text-transform: none;">TManage</span>
                        </div>
                       </div>
                      </div>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                 <tr>
                  <td valign="top" style="padding: 0px 0px 0px 0px;">
                   <table class="pc-w620-width-100pc" width="369" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: auto;">
                    <tr>
                     <!--[if gte mso 9]>
                    <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #ffffff1a;">&nbsp;</td>
                <![endif]-->
                     <!--[if !gte mso 9]><!-- -->
                     <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #ffffff1a;">&nbsp;</td>
                     <!--<![endif]-->
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td align="center" style="padding: 16px 0px 17px 0px;">
                   <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                     <td valign="top">
                      <table class="pc-width-hug pc-w620-gridCollapsed-0" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr class="pc-grid-tr-first pc-grid-tr-last">
                        <td class="pc-grid-td-first pc-w620-itemsSpacings-20-30" valign="top" style="width: 20%; padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 0px;">
                         <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td align="center" valign="top">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <a class="pc-font-alt" href="https://tmanage-ui.vercel.app/" target="_blank" style="display: block; text-decoration: none; line-height: 150%; letter-spacing: -0.2px; font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 500; font-variant-ligatures: normal; color: #ffffff; text-align: center; text-align-last: center;">
                                   <span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif;font-weight: 500;font-style: normal;color: rgb(255, 255, 255);letter-spacing: 0px;">Home</span> 
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-w620-itemsSpacings-20-30" valign="top" style="width: 20%; padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;">
                         <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td align="center" valign="top">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="left">
                                  <a class="pc-font-alt" href="https://tmanage-ui.vercel.app#features" target="_blank" style="text-decoration: none;">
                                   <div style="text-align:center;text-align-last:center;color:#ffffff;font-size:14px;letter-spacing:0px;font-weight:500;font-style:normal;font-variant-ligatures:normal;">
                                    <div style="margin-bottom: 0px;"><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; line-height: 150%; text-decoration: none; text-transform: none;">Features</span>
                                    </div>
                                   </div>
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-w620-itemsSpacings-20-30" valign="top" style="width: 20%; padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;">
                         <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td align="center" valign="top">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <div class="pc-font-alt" style="line-height: 150%; letter-spacing: -0.2px; font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 500; font-variant-ligatures: normal; color: #ffffff; text-align: center; text-align-last: center;">
                                   <div><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif;font-weight: 500;font-style: normal;color: rgb(255, 255, 255);letter-spacing: 0px;">Solutions</span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-w620-itemsSpacings-20-30" valign="top" style="width: 20%; padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;">
                         <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td align="center" valign="top">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <div class="pc-font-alt" style="line-height: 150%; letter-spacing: -0.2px; font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 500; font-variant-ligatures: normal; color: #ffffff; text-align: center; text-align-last: center;">
                                   <div><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif;font-weight: 500;font-style: normal;color: rgb(255, 255, 255);letter-spacing: 0px;">Help</span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-grid-td-last pc-w620-itemsSpacings-20-30" valign="top" style="width: 20%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px;">
                         <table style="border-collapse: separate; border-spacing: 0; width: 100%;" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td align="center" valign="top">
                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td align="center" valign="top">
                               <table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="border-collapse: separate; border-spacing: 0;">
                                <tr>
                                 <td valign="top" align="center">
                                  <div class="pc-font-alt" style="line-height: 150%; letter-spacing: -0.2px; font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif; font-size: 14px; font-weight: 500; font-variant-ligatures: normal; color: #ffffff; text-align: center; text-align-last: center;">
                                   <div><span style="font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif;font-weight: 500;font-style: normal;color: rgb(255, 255, 255);letter-spacing: 0px;">About</span>
                                   </div>
                                  </div>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                 <tr>
                  <td valign="top" style="padding: 0px 0px 24px 0px;">
                   <table class="pc-w620-width-100pc" width="369" border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin: auto;">
                    <tr>
                     <!--[if gte mso 9]>
                    <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #ffffff1a;">&nbsp;</td>
                <![endif]-->
                     <!--[if !gte mso 9]><!-- -->
                     <td height="1" valign="top" style="line-height: 1px; font-size: 1px; border-bottom: 1px solid #ffffff1a;">&nbsp;</td>
                     <!--<![endif]-->
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                 <tr>
                  <td class="pc-w620-valign-middle pc-w620-halign-center" align="center" style="padding: 0px 0px 24px 0px;">
                   <table class="pc-w620-halign-center" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                     <td valign="top">
                      <table class="pc-width-hug pc-w620-gridCollapsed-0 pc-w620-halign-center" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                       <tr class="pc-grid-tr-first pc-grid-tr-last">
                        <td class="pc-grid-td-first pc-w620-itemsSpacings-20-0" valign="top" style="width: 25%; padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 0px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-halign-center pc-w620-valign-middle" align="center" valign="top">
                            <table class="pc-w620-halign-center" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td class="pc-w620-halign-center" align="center" valign="top">
                               <table class="pc-w620-halign-center" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                 <td valign="top">
                                  <a class="pc-font-alt" href="https://facebook.com/" target="_blank" style="text-decoration: none;">
                                   <img src="https://cloudfilesdm.com/postcards/49d3df40d21a60424c3bf0f27d4ce8f9.png" class="" width="24" height="24" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 24px; height: 24px;" alt="" />
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-w620-itemsSpacings-20-0" valign="top" style="width: 25%; padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-halign-center pc-w620-valign-middle" align="center" valign="top">
                            <table class="pc-w620-halign-center" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td class="pc-w620-halign-center" align="center" valign="top">
                               <table class="pc-w620-halign-center" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                 <td valign="top">
                                  <a class="pc-font-alt" href="https://x.com/" target="_blank" style="text-decoration: none;">
                                   <img src="https://cloudfilesdm.com/postcards/fe68152620e8c8adcbb7728bd667dadb.png" class="" width="24" height="24" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 24px; height: 24px;" alt="" />
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-w620-itemsSpacings-20-0" valign="top" style="width: 25%; padding-top: 0px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-halign-center pc-w620-valign-middle" align="center" valign="top">
                            <table class="pc-w620-halign-center" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td class="pc-w620-halign-center" align="center" valign="top">
                               <table class="pc-w620-halign-center" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                 <td valign="top">
                                  <a class="pc-font-alt" href="https://www.instagram.com" target="_blank" style="text-decoration: none;">
                                   <img src="https://cloudfilesdm.com/postcards/97d1e3e2fd722d0140b51806fa857340.png" class="" width="24" height="24" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 24px; height: 24px;" alt="" />
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                        <td class="pc-grid-td-last pc-w620-itemsSpacings-20-0" valign="top" style="width: 25%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 10px;">
                         <table style="border-collapse: separate; border-spacing: 0;" border="0" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                           <td class="pc-w620-halign-center pc-w620-valign-middle" align="center" valign="top">
                            <table class="pc-w620-halign-center" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                             <tr>
                              <td class="pc-w620-halign-center" align="center" valign="top">
                               <table class="pc-w620-halign-center" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                 <td valign="top">
                                  <a class="pc-font-alt" href="https://www.instagram.com" target="_blank" style="text-decoration: none;">
                                   <img src="https://cloudfilesdm.com/postcards/9807838a6a4c0dd0d700aff6f20f6d98.png" class="" width="24" height="24" style="display: block; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; width: 24px; height: 24px;" alt="" />
                                  </a>
                                 </td>
                                </tr>
                               </table>
                              </td>
                             </tr>
                            </table>
                           </td>
                          </tr>
                         </table>
                        </td>
                       </tr>
                      </table>
                     </td>
                    </tr>
                   </table>
                  </td>
                 </tr>
                </table>
               </td>
              </tr>
             </table>
            </td>
           </tr>
          </table>
          <!-- END MODULE: Footer -->
         </td>
        </tr>
        <!-- <tr>
         <td>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
           <tr>
            <td align="center" valign="top" style="padding-top: 20px; padding-bottom: 20px; vertical-align: top;">
             <a href="https://postcards.email/?uid=Mjg0MjEx&type=footer" target="_blank" style="text-decoration: none; overflow: hidden; border-radius: 2px; display: inline-block;">
              <img src="https://cloudfilesdm.com/postcards/promo-footer-dark.jpg" width="198" height="46" alt="Made with (o -) postcards" style="width: 198px; height: auto; margin: 0 auto; border: 0; outline: 0; line-height: 100%; -ms-interpolation-mode: bicubic; vertical-align: top;">
             </a>
             <img src="https://api-postcards.designmodo.com/tracking/mail/promo?uid=Mjg0MjEx" width="1" height="1" alt="" style="display:none; width: 1px; height: 1px;">
            </td>
           </tr>
          </table>
         </td>
        </tr> -->
       </table>
      </td>
     </tr>
    </table>
   </td>
  </tr>
 </table>
 <!-- Fix for Gmail on iOS -->
 <div class="pc-gmail-fix" style="white-space: nowrap; font: 15px courier; line-height: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
 </div>
</body>

</html>

    `;
};
