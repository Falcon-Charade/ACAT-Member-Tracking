import { describe, expect, it } from 'vitest';
import { validateCreateMemberRequest, validateUpdateMemberRequest } from '../member/member.validation';
import { MEMBER_ROLES, MEMBER_STAGES } from '../../shared-types/src/member/member.types';

describe('successValidateCreateMemberRequest - Applicant', () => {
    it('validates a correct request', () => {
        const currentDateTime = new Date();
        const currentDay = String(currentDateTime.getUTCDate()).padStart(2, '0');
        const currentMonth = String(currentDateTime.getUTCMonth() + 1).padStart(2, '0');
        const currentYear = currentDateTime.getUTCFullYear();
        const currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;

        const request = {
            name: 'John Doe',
            role: 'Applicant',
            recruiter: 'Jane Smith',
            stage: "Probation",
            joinedAt: currentDateString,
            basicTrainingCompleted: false,
            progressionApplicant: null,
            joinedMain: 0,
            joinedOther: 0,
            readyForPromotion: false,
            progressionNewMember: null,
            progressionMember: null
        };
        const result = validateCreateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "basicTrainingCompleted": false,
                    "joinedAt": currentDateString,
                    "joinedMain": 0,
                    "joinedOther": 0,
                    "name": "John Doe",
                    "progressionApplicant": null,
                    "progressionMember": null,
                    "progressionNewMember": null,
                    "readyForPromotion": false,
                    "recruiter": "Jane Smith",
                    "role": "Applicant",
                    "stage": "Probation",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - name - Valid', () => {
    it('validates a correct request', () => {
        const request = {
            name: 'John Doe',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "name": "John Doe",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - name - Invalid', () => {
    it('validates a correct request', () => {
        const request = {
            name: 64,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "name",
                        "message": `name must be a string.`,
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - role - Applicant', () => {
    it('validates a correct request', () => {
        const request = {
            role: 'Applicant',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "role": "Applicant",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - role - New Member', () => {
    it('validates a correct request', () => {
        const request = {
            role: 'New Member',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "role": "New Member",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - role - Member', () => {
    it('validates a correct request', () => {
        const request = {
            role: 'Member',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "role": "Member",
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - role - Invalid', () => {
    it('validates a correct request', () => {
        const request = {
            role: 'Invalid Role',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_value",
                        "field": "role",
                        "message": `Role must be one of: ${Object.values(MEMBER_ROLES).join(', ')}.`,
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - recruiter - Name', () => {
    it('validates a correct request', () => {
        const request = {
            recruiter: 'Jane Smith',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "recruiter": "Jane Smith",
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - recruiter - Invalid', () => {
    it('validates a correct request', () => {
        const request = {
            recruiter: 25,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "recruiter",
                        "message": `recruiter must be a string.`,
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - stage - Probation', () => {
    it('validates a correct request', () => {
        const request = {
            stage: "Probation",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "stage": "Probation",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - stage - Complete', () => {
    it('validates a correct request', () => {
        const request = {
            stage: "Complete",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "stage": "Complete",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - stage - Left', () => {
    it('validates a correct request', () => {
        const request = {
            stage: "Left",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "stage": "Left",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - stage - On Break', () => {
    it('validates a correct request', () => {
        const request = {
            stage: "On Break",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "stage": "On Break",
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - stage - Invalid', () => {
    it('validates a correct request', () => {
        const request = {
            stage: "Invalid Stage",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_value",
                        "field": "stage",
                        "message": `Stage must be one of: ${Object.values(MEMBER_STAGES).join(', ')}.`,
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - joinedAt - Today', () => {
    it('validates a correct request', () => {
        const currentDateTime = new Date();
        const currentDay = String(currentDateTime.getUTCDate()).padStart(2, '0');
        const currentMonth = String(currentDateTime.getUTCMonth() + 1).padStart(2, '0');
        const currentYear = currentDateTime.getUTCFullYear();
        const currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;

        const request = {
            joinedAt: currentDateString,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "joinedAt": currentDateString,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - joinedAt - Past Date', () => {
    it('validates a correct request', () => {
        const request = {
            joinedAt: '2020-01-01',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "joinedAt": "2020-01-01",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - joinedAt - Future Date', () => {
    it('validates a correct request', () => {
        const request = {
            joinedAt: '2035-01-01',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "joinedAt": "2035-01-01",
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - joinedAt - False Date', () => {
    it('validates a correct request', () => {
        const request = {
            joinedAt: new Date('2020-20-20'),
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "joinedAt",
                        "message": "joinedAt must be a string.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - joinedAt - Not a Date', () => {
    it('validates a correct request', () => {
        const request = {
            joinedAt: "Not a date",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_date",
                        "field": "joinedAt",
                        "message": "joinedAt must be a valid date.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - basicTrainingCompleted - False', () => {
    it('validates a correct request', () => {
        const request = {
            basicTrainingCompleted: false,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "basicTrainingCompleted": false,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - basicTrainingCompleted - True', () => {
    it('validates a correct request', () => {
        const request = {
            basicTrainingCompleted: true,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "basicTrainingCompleted": true,
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - basicTrainingCompleted - Null', () => {
    it('validates a correct request', () => {
        const request = {
            basicTrainingCompleted: null,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "basicTrainingCompleted",
                        "message": "basicTrainingCompleted must not be null.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - basicTrainingCompleted - string', () => {
    it('validates a correct request', () => {
        const request = {
            basicTrainingCompleted: "not a boolean",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "basicTrainingCompleted",
                        "message": "basicTrainingCompleted must be a boolean.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionApplicant - null', () => {
    it('validates a correct request', () => {
        const request = {
            progressionApplicant: null,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionApplicant": null,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionApplicant - Today', () => {
    it('validates a correct request', () => {
        const currentDateTime = new Date();
        const currentDay = String(currentDateTime.getUTCDate()).padStart(2, '0');
        const currentMonth = String(currentDateTime.getUTCMonth() + 1).padStart(2, '0');
        const currentYear = currentDateTime.getUTCFullYear();
        const currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;

        const request = {
            progressionApplicant: currentDateString,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionApplicant": currentDateString,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionApplicant - Past Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionApplicant: '2020-01-01',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionApplicant": "2020-01-01",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionApplicant - Future Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionApplicant: '2035-01-01',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionApplicant": "2035-01-01",
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - progressionApplicant - False Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionApplicant: '2020-20-20',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_date",
                        "field": "progressionApplicant",
                        "message": "progressionApplicant must be a valid date.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - progressionApplicant - Invalid Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionApplicant: "Not a date",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_date",
                        "field": "progressionApplicant",
                        "message": "progressionApplicant must be a valid date.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - joinedMain - Zero', () => {
    it('validates a correct request', () => {
        const request = {
            joinedMain: 0,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "joinedMain": 0,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - joinedMain - Positive Number', () => {
    it('validates a correct request', () => {
        const request = {
            joinedMain: 5,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "joinedMain": 5,
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - joinedMain - Negative Number', () => {
    it('validates a correct request', () => {
        const request = {
            joinedMain: -5,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "negative_value",
                        "field": "joinedMain",
                        "message": "joinedMain must be a 0 or greater.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - joinedMain - Not a Number', () => {
    it('validates a correct request', () => {
        const request = {
            joinedMain: "not a number",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "joinedMain",
                        "message": "joinedMain must be an integer.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - joinedOther - Zero', () => {
    it('validates a correct request', () => {
        const request = {
            joinedOther: 0,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "joinedOther": 0,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - joinedOther - Positive Number', () => {
    it('validates a correct request', () => {
        const request = {
            joinedOther: 5,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "joinedOther": 5,
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - joinedOther - Negative Number', () => {
    it('validates a correct request', () => {
        const request = {
            joinedOther: -5,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "negative_value",
                        "field": "joinedOther",
                        "message": "joinedOther must be a 0 or greater.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - joinedOther - Not a Number', () => {
    it('validates a correct request', () => {
        const request = {
            joinedOther: "not a number",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "joinedOther",
                        "message": "joinedOther must be an integer.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - readyForPromotion - False', () => {
    it('validates a correct request', () => {
        const request = {
            readyForPromotion: false,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "readyForPromotion": false,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - readyForPromotion - True', () => {
    it('validates a correct request', () => {
        const request = {
            readyForPromotion: true,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "readyForPromotion": true,
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - readyForPromotion - Null', () => {
    it('validates a correct request', () => {
        const request = {
            readyForPromotion: null,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "readyForPromotion",
                        "message": "readyForPromotion must not be null.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - readyForPromotion - Not a Boolean', () => {
    it('validates a correct request', () => {
        const request = {
            readyForPromotion: "not a boolean",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_type",
                        "field": "readyForPromotion",
                        "message": "readyForPromotion must be a boolean.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionNewMember - Null', () => {
    it('validates a correct request', () => {
        const request = {
            progressionNewMember: null,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionNewMember": null,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionNewMember - Today', () => {
    it('validates a correct request', () => {
        const currentDateTime = new Date();
        const currentDay = String(currentDateTime.getUTCDate()).padStart(2, '0');
        const currentMonth = String(currentDateTime.getUTCMonth() + 1).padStart(2, '0');
        const currentYear = currentDateTime.getUTCFullYear();
        const currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;

        const request = {
            progressionNewMember: currentDateString,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionNewMember": currentDateString,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionNewMember - Past Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionNewMember: '2020-01-01',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionNewMember": "2020-01-01",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionNewMember - Future Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionNewMember: '2035-01-01',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionNewMember": "2035-01-01",
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - progressionNewMember - False Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionNewMember: '2020-20-20',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_date",
                        "field": "progressionNewMember",
                        "message": "progressionNewMember must be a valid date.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - progressionNewMember - Not a Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionNewMember: "not a date",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_date",
                        "field": "progressionNewMember",
                        "message": "progressionNewMember must be a valid date.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionMember - Null', () => {
    it('validates a correct request', () => {
        const request = {
            progressionMember: null,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionMember": null,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionMember - Today', () => {
    it('validates a correct request', () => {
        const currentDateTime = new Date();
        const currentDay = String(currentDateTime.getUTCDate()).padStart(2, '0');
        const currentMonth = String(currentDateTime.getUTCMonth() + 1).padStart(2, '0');
        const currentYear = currentDateTime.getUTCFullYear();
        const currentDateString = `${currentYear}-${currentMonth}-${currentDay}`;

        const request = {
            progressionMember: currentDateString,
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionMember": currentDateString,
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionMember - Past Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionMember: '2020-01-01',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionMember": "2020-01-01",
                },
            }
        );
    });
});

describe('successValidateUpdateMemberRequest - progressionMember - Future Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionMember: '2035-01-01',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [],
                "success": true,
                "value": {
                    "progressionMember": "2035-01-01",
                },
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - progressionMember - False Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionMember: '2020-20-20',
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_date",
                        "field": "progressionMember",
                        "message": "progressionMember must be a valid date.",
                    },
                ],
                "success": false,
            }
        );
    });
});

describe('failValidateUpdateMemberRequest - progressionMember - Not a Date', () => {
    it('validates a correct request', () => {
        const request = {
            progressionMember: "not a date",
        };
        const result = validateUpdateMemberRequest(request);
        expect(result).toEqual
        (
            {
                "issues": [
                    {
                        "code": "invalid_date",
                        "field": "progressionMember",
                        "message": "progressionMember must be a valid date.",
                    },
                ],
                "success": false,
            }
        );
    });
});