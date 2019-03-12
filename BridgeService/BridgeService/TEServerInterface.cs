using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;

namespace BridgeService
{
    public class TEServerInterface
    {
        //public void TESignOff()
        //{
        //    var server = new TEServerSoapWrapper();
        //    var sRs = new TEServer.TESignoffRs();
        //    var sStr = "";
        //    SetupTEAuthHeader(server);
        //    try
        //    {
        //        sRs = server.TESignoff();
        //    }
        //    catch { }
        //}

        private string GetUTCDateTime(DateTime dt)
        {
            string sUTCDateTime;
            int iHourDiff;
            sUTCDateTime = dt.Year.ToString("000");
            sUTCDateTime += "-" + dt.Month.ToString("00");
            sUTCDateTime += "-" + dt.Day.ToString("00");
            sUTCDateTime += "T" + dt.Hour.ToString("00");
            sUTCDateTime += ":" + dt.Minute.ToString("00");
            sUTCDateTime += ":" + dt.Second.ToString("00");
            sUTCDateTime += "." + dt.Millisecond.ToString("000000");
            iHourDiff = TimeZone.CurrentTimeZone.GetUtcOffset(dt).Hours;
            if (iHourDiff >= 0)
            {
                sUTCDateTime += "+" + TimeZone.CurrentTimeZone.GetUtcOffset(dt).Hours.ToString("00") + ":" + TimeZone.CurrentTimeZone.GetUtcOffset(DateTime.Now).Minutes.ToString("00");
            }
            else
            {
                sUTCDateTime += TimeZone.CurrentTimeZone.GetUtcOffset(dt).Hours.ToString("00") + ":" + TimeZone.CurrentTimeZone.GetUtcOffset(DateTime.Now).Minutes.ToString("00");
            }

            return sUTCDateTime;
        }

        string sSessionKey;
        public void SetupTEAuthHeader(TEServer.TEServer server)
        {
            XmlDocument ifxSignOnRq = new XmlDocument();
            string sDt = "";
            string sSignOnRq = "";
            XmlDocument xmlDoc;
            XmlTextReader xmlReader;
            StringReader strReader;
            string sSpName;

            sSpName = "TE-DEMO";

            sDt = GetUTCDateTime(DateTime.Now);

            if (!string.IsNullOrEmpty( sSessionKey ))
            {
                sSignOnRq = sSignOnRq + "<SignonRq>";
                sSignOnRq = sSignOnRq + "  <SessKey>" + sSessionKey + "</SessKey>";
                sSignOnRq = sSignOnRq + "  <ClientDt>" + sDt + "</ClientDt>";
                sSignOnRq = sSignOnRq + "  <CustLangPref>EN</CustLangPref>";
                sSignOnRq = sSignOnRq + "  <ClientApp>";
                sSignOnRq = sSignOnRq + "    <Org>HFS</Org>";
                sSignOnRq = sSignOnRq + "    <Name>TEServerTest</Name>";
                sSignOnRq = sSignOnRq + "    <Version>1.0</Version>";
                sSignOnRq = sSignOnRq + "  </ClientApp>";
                sSignOnRq = sSignOnRq + "</SignonRq>";
            }
            else
            {
                sSignOnRq = "<?xml version='1.0'?> ";
                sSignOnRq = sSignOnRq + "<SignonRq>";
                sSignOnRq = sSignOnRq + "  <SignonPswd>";
                sSignOnRq = sSignOnRq + "    <SignonRole>Agent</SignonRole>";
                sSignOnRq = sSignOnRq + "    <CustId>";
                sSignOnRq = sSignOnRq + "      <SPName>" + sSpName + "</SPName>";
                sSignOnRq = sSignOnRq + "      <CustLoginId>agent1</CustLoginId>";
                sSignOnRq = sSignOnRq + "    </CustId>";
                sSignOnRq = sSignOnRq + "    <CustPswd>";
                sSignOnRq = sSignOnRq + "      <CryptType>None</CryptType>";
                sSignOnRq = sSignOnRq + "      <Pswd>1234</Pswd>";
                sSignOnRq = sSignOnRq + "    </CustPswd>";
                sSignOnRq = sSignOnRq + "    <GenSessKey>1</GenSessKey>";
                sSignOnRq = sSignOnRq + "  </SignonPswd>";
                sSignOnRq = sSignOnRq + "  <ClientDt>" + sDt + "</ClientDt>";
                sSignOnRq = sSignOnRq + "  <CustLangPref>EN</CustLangPref>";
                sSignOnRq = sSignOnRq + "  <ClientApp>";
                sSignOnRq = sSignOnRq + "    <Org>HFS</Org>";
                sSignOnRq = sSignOnRq + "    <Name>TEServerTest</Name>";
                sSignOnRq = sSignOnRq + "    <Version>1.0</Version>";
                sSignOnRq = sSignOnRq + "  </ClientApp>";
                sSignOnRq = sSignOnRq + "</SignonRq>";
            }
            strReader = new StringReader(sSignOnRq);
            xmlReader = new XmlTextReader(strReader);
            ifxSignOnRq = new XmlDocument();
            ifxSignOnRq.Load(xmlReader);
            server.Url = "http://localhost/TEServer/TEServer.asmx";
            server.TEAuthRq = new TEServer.TEAuthRqHdr();
            server.TEAuthRq.IfxSignonRq = ifxSignOnRq.DocumentElement;
            server.TEAuthRq.IfxVersion = "1.3";
        }
    }
}