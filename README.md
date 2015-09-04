Project portal for SharePoint
=================

This is the english version of <a href="https://github.com/prosjektstotte/sp-prosjektportal">"Prosjektportal for SharePoint"</a>.

Important: This is a work in progress of the english version of the project portal for SharePoint. We do not recommend to download and install this version before we release an "official" first version. Stay tuned for updates to this page.

# Installation
* Run sherpa in the package directory with params --url, --userName, --spo (if Sharepoint Online)
* Do step 1
* Do step 2
* Do step 3
* Do step 4
* Do step 5
* Install complete

# Maintainers
Tarjei Ormestøyl [<a href="mailto:tarjeieo@puzzlepart.com">tarjeieo@puzzlepart.com</a>], 
Ole Kristian Mørch-Storstein [<a href="mailto:olekms@puzzlepart.com">olekms@puzzlepart.com</a>]

# Feilsøking
## Problem: Du får feilmeldingen "Method not found: ‘Void Microsoft.SharePoint.Client.ContentTypeCreationInformation.set_Id(System.String)’" i steg 3 når du installerer løsningen til On-Premises.

Løsning: Du installerer på feil miljø eller har en gammel versjon av SharePoint 2013 (før Service Pack 1). Du må installere Service Pack 1 for å kunne installere løsningen. <a href="http://developeratwar.com/2014/10/you-get-an-exception-occured-method-not-found-void-microsoft-sharepoint-client-conten-ttypecreationinformation-set_idsystem-string">Les mer om denne feilen</a>

## Problem: Du får feilmeldingen "Value does not fall within the expected range" i steg 2 når du installerer løsningen.

Mulig løsning: Du installerer til et underområde istedenfor til en områdesamling. Du må først opprette en områdesamling fra SharePoint Admin Center (Office 365) eller Central Administration (On-premises). Se installasjonssteg 1 over.

## Problem: Installasjon av termset (operasjon 1) og andre operasjoner på SharePoint 2013 on-premises feiler med meldingen: "An exception occured: The remote server returned an error: (401) Unauthorized."

Mulig løsning: Serveren har loopback check slått på. Se <a href="http://support.microsoft.com/kb/926642/en-us?wa=wsignin1.0">KB-926642 for løsning.</a>

## Problem: Installasjonen feiler med feilmeldingen "(407) Proxy-godkjenning kreves." eller "(407) Proxy Authentication Required"

Mulig løsng: Det kan være at nettverkstrafikken og autentiseringen må gjennom en proxy før den når SharePoint Online. Prøv å installere fra et annet nettverk eller ta kontakt for bistand.

## Problem: Opplasting av pakke (operasjon 2) mot SharePoint online feiler med feilmelding "403 Forbidden", selv om du er sikker på at du har oppgitt riktig brukernavn og passord

Mulig løsning: Du må kanskje slå på valget "Tillat brukere å kjøre skript på brukeropprettede områder" i globale innstillinger for Office 365 / SharePoint. Gå til Administrasjonsenter for SharePoint --> Innstillinger --> Gå ned til seksjonen "Egendefinert skript" --> Velg "Tillat brukere å kjøre skript på brukeropprettede områder". Se også <a href="https://support.office.com/en-us/article/Turn-scripting-capabilities-on-and-off-1f2c515f-5d7e-448a-9fd7-835da935584f?CorrelationId=aa45d353-1ade-4440-88e8-9310d92e9c85&ui=en-US&rs=en-US&ad=US">Turn scripting capabilities on and off</a>.
