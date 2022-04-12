export const dailyChecks = [
    'Check Collectors Healths',
    'Check Log sources status',
    'Check Daily Backup','Check Daily scheduled reports/jobs ','Check Server Diskspace'
];
export const shiftStatus = [
    'Initial Investigation','Solution In Progress','Pending','Closed'
]
export const playbookCategories = [
    'Improper Usage/ Policy Violation','Reconnaissance','Unauthorised Access','Unauthorised Change','Infection','DDoS','Phishing',
    'BOTNET/C&C Communication','Data Leakage','Rogue Device Installed','Other'
];

export const advisorySource = [
    'FINCERT','EG-CERT','SAMA','NCA','Other'
]
// Incident

export const incidentPriority = ['Critical','High','Medium','Low']

export const incidentClassifications = [
    'Denial of Service','Malware','Security Compromise','Network Security','Unauthorized Access/Use','Unplanned Downtime','Physical Security','Social Engineering','Other'
]

export const incidentNotifications = ['Network Team','Tech Team','InfoSec Team','Helpdesk','Business Team','Compliance Team','Other']

// Use Case

export const caseTypes = [
    'Self Monitoring','Insider Threat','External Threat','Compliance - PCI',
    'Compliance - CBE','Other'
]

export const alertVolumes = [
    'Very High','High','Medium','Low','Very Low'
]

export const caseTesting = [
    'Tested','Not Tested','Pending'
]

export const caseProductions = [
    'Enabled','Disabled','Under Testing'
]