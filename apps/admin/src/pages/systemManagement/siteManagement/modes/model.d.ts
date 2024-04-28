export declare namespace ModesApi {
  type FormItem = {
    identityCard: string;
    name: string;
    nationality: string;
    gender: string;
    birthday: string;
    issuingAuthority: string;
    validityStartDate: string;
    validityEndDate: string;
    occupationalHealth: string;
    maritalStatus: string;
    workYears: string;
    address: string;
    companyName: string;
    creditCode: string;
    jobState: string;
    enabled: string;
    age: string;
    phone: string;
    email: string;
    educational: string;
    registeredPlace: string;
    policitalStatus: string;
    accountType: string;
    upAccount: string;
    contact: string;
    specialty: string;
    hasMajorMedicalHistory: string;
    emergencyContactName: string;
    emergencyContactMethod: string;
  };

  type PersonnelCertificateSaveReqVO = {
    credentialName?: string;
    credentialNumber?: string;
    certificateType?: string;
    certificateCategory?: string;
    certificateLevel?: string;
    positionTitle?: string;
    firstIssuedDate?: string;
    validityStartDate?: string;
    validityEndDate?: string;
    issuingAuthority?: string;
    reviewDate?: string;
    picture?: string;
  };
}
