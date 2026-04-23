# ACAT Member Tracking Application Functional Behaviour

## Document Control

**Document Title:** ACAT Member Tracking Functional Behaviour  
**Document Owner:** ACAT  
**Version:** 0.1  
**Status:** Draft  
**Last Updated:** 2026-04-07  
**Approved By:** Falcon Charade

---

## 1. Purpose

This document defines the functional behaviour of the **ACAT Member Tracking** application. It describes the rules that govern member creation, phase routing, automatic pre-save assistance, and read-only visibility. The document is intended to provide a single reference point for delivery, testing, maintenance, and stakeholder review.

---

## 2. Scope

This document covers the following functional areas:

- Add-member default values
- Phase routing rules
- Automatic pre-save helper rules
- Read-only visibility rules

**Out of scope:**

- Authentication and identity provider implementation
- Google Sheets technical integration design
- Audit logging and reporting design
- Infrastructure, deployment, and hosting design
- Detailed UI layout and visual styling

---

## 3. Application Overview

The **ACAT Member Tracking** application is used to view and manage member progression data stored in [the member tracking source](https://docs.google.com/spreadsheets/d/1Q7W23Cru5LyRmWiPBC-sTgTERI6qr8LhLbpBU2D3Wm0). It supports controlled creation and maintenance of member records while ensuring that derived behaviour remains consistent and predictable.

**Application name:** ACAT Member Tracking  
**Primary purpose:** Manage member progression records across defined phases  
**Primary users:** Recruiters, authorised editors, and read-only viewers  
**Primary record type:** Member  
**Key functions:**

- Add new member records
- View existing member records
- Edit authorised fields
- Route members into the correct phase based on role
- Apply helper logic before save
- Provide read-only access where editing is not permitted

---

## 4. Definitions and Terminology

| Term | Definition |
| --- | --- |
| Member | A person being tracked in the member progression process |
| Role | The member’s assigned role value used to determine routing and progression context |
| Phase | A system-defined grouping used to organise records based on role |
| Pre-save helper rule | Automatic logic applied when a user selects save, before the record is committed |
| Read-only | A mode in which data can be viewed but not changed |
| Recruiter | An authorised user associated with creation or maintenance of a member record |

---

## 5. Functional Rules

### 5.1 Add-Member Defaults

#### Rule Summary

When a new member is created, the application applies standard default values to ensure records begin from a known and valid baseline.

#### Trigger

These defaults are applied when a user opens the add-member flow and prepares a new member record for saving.

#### Default Values

| Field | Default Value | Notes |
| --- | --- | --- |
| Role | Blank | A new record starts without an assigned role |
| Stage | Probation | New records default to the Probation stage |
| Training / Induction Done | false | Training is assumed incomplete on creation |
| Main Missions Joined | 0 | New records start with no main missions joined |
| Other Missions Joined | 0 | New records start with no other missions joined |
| Ready to Progress | false | New records are not ready to progress by default |
| Progression to Applicant | Blank | No progression date exists on creation |
| Progression to New Member | Blank | No progression date exists on creation |
| Progression to Member | Blank | No progression date exists on creation |
| Notes / Observations | Blank | Notes are empty on creation unless entered by the user |

#### Behaviour Notes

- Defaults should be presented consistently for every new record.
- Only the **Notes / Observations** field will be visible to the user when adding a new member. All other fields require updating after creation.
- Defaults are intended to reduce data-entry effort and improve consistency.
- Users may review and change editable values before saving, subject to permission and validation rules.
- Default values apply only to newly created records and must not overwrite existing records during edit flows.

#### Exceptions

- No exception applies unless a future rule explicitly overrides a default for a specific workflow.
- System-generated identifiers, where applicable, are not treated as manual defaults and are handled separately.

---

### 5.2 Phase Routing

#### Rule Summary

The application routes each member record into a phase based on the value in the **Role** field.

#### Routing Rules

| Role Value | Routed Phase | Notes |
| --- | --- | --- |
| Blank | Phase 1 | Used for records that have not yet completed basic training |
| Applicant | Phase 2 | Used for members in the applicant state |
| New Member | Phase 3 | Used for members in the new member state |

#### Detailed Logic

When a member record is created or updated, the application evaluates the **Role** field and uses it to determine the member’s phase.

#### Processing Notes

- Phase routing is automatic and not manually assigned by the user unless the application explicitly exposes such a control.
- Routing logic must use the current value of **Role**.
- Unsupported or unexpected role values should be handled safely, for example by validation failure or controlled fallback behaviour, depending on the agreed implementation.

#### Edge Cases

- A blank role must always route to **Phase 1**.
- A role of **Applicant** must always route to **Phase 2**.
- A role of **New Member** must always route to **Phase 3**.
- Any role value outside the supported set should not be silently accepted without defined handling.

---

### 5.3 Automatic Pre-Save Helper Rules

#### Rule Summary

Before a record is committed, the application applies helper logic to improve consistency, normalise values, and support the user in producing a valid save.

#### Trigger

Pre-save helper rules run when the user selects **Save**, before the record is written.

#### Rule List

| Rule Name | Condition | Action | User Impact |
| --- | --- | --- | --- |
| Default application check | Record is new and required default fields are unset | Apply default values | Ensures new records start from a standard baseline |
| Role-to-phase evaluation | Role has been entered or changed | Recalculate routed phase behaviour | Ensures record appears in the correct phase |
| Boolean normalisation | Boolean fields are missing or not in canonical form | Convert to canonical true/false values | Prevents inconsistent storage |
| Numeric normalisation | Numeric count fields are empty or non-canonical | Convert to canonical numeric values | Prevents invalid mission counts |
| Date formatting / parsing | Date fields are entered | Validate and normalise to agreed date format | Prevents invalid or inconsistent date values |
| Required field validation | Mandatory fields are missing | Block save and surface validation message | Prevents incomplete records being committed |

#### Behaviour Description

Pre-save helper rules are intended to support the user rather than replace user intent. The application should evaluate the record immediately before save and apply the following categories of logic:

##### 5.3.1 Default Preservation and Completion

For new records, the application confirms that expected default values are present.

##### 5.3.2 Role and Phase Consistency

Where role affects routing, the application ensures that the record will appear in the correct phase once saved.

##### 5.3.3 Boolean Normalisation

Boolean values, such as **Training / Induction Done** and **Ready to Progress**, must be stored in a consistent true/false format.

##### 5.3.4 Numeric Normalisation

Numeric fields, such as **Main Missions Joined** and **Other Missions Joined**, must be normalised into valid numeric values and must not be saved in an invalid format.

##### 5.3.5 Date Validation and Formatting

Where progression dates are used, dates must be validated and formatted according to the agreed application standard.

##### 5.3.6 Required Field Enforcement

The application must stop the save when required information is missing or invalid.

#### Validation / Formatting Notes

- Date handling should follow the agreed application standard of [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).
- Boolean fields must be canonicalised before write.
- Numeric fields must not accept invalid minimum values.
- Required fields must be enforced consistently in both create and update flows where applicable.
- Helper rules must run before the final write occurs, but only when the user explicitly selects save.

#### Exceptions

- Pre-save helper rules do not commit changes automatically without a user save action.
- Helper logic must not overwrite valid user-entered data unless the rule is explicitly defined to normalise formatting.
- Read-only users do not trigger save logic because they cannot save changes.

---

### 5.4 Read-Only Visibility Rules

#### Rule Summary

The application must support read-only access for users who are permitted to view records but not edit them.

#### Visibility Rules

| Rule Area | Behaviour |
| --- | --- |
| Record viewing | Read-only users may open and view records they are authorised to access |
| Field editing | Read-only users must not be able to modify editable fields |
| Save actions | Save controls must be hidden or disabled in read-only mode |
| Derived/routed values | Read-only users may see routed and calculated values where those are part of the normal record view |
| Notes / Observations | Visibility must follow the agreed business rule for the specific user type and view |

#### Behaviour Description

In read-only mode, the application must provide visibility into member data without permitting modification. The user should be able to inspect records, understand the member’s current data, and view routing-related information, but must not be able to commit changes.

#### Interaction Rules

- Read-only users may view member records.
- Read-only users may navigate between permitted views.
- Read-only users must not be able to trigger edit saves.
- Edit controls, destructive actions, and save actions should be removed or disabled.
- The interface should clearly communicate that the record is read-only where necessary.
- Filtering, searching, or sorting may remain available if those actions do not modify stored data.

#### Exceptions

- Any field hidden for privacy, confidentiality, or role-based access reasons must follow the agreed permission model.
- If different classes of read-only user exist, the application may apply different field visibility rules by permission group.

---

## 6. User Flow Summary

1. The user opens the add-member screen.
2. The application prepares a new member record with standard defaults.
3. The user enters or reviews member details.
4. The application evaluates the **Role** value to determine the routed phase.
5. When the user selects **Save**, pre-save helper rules run.
6. Validation passes or the user is prompted to correct issues.
7. The record is committed.
8. Users with read-only access may view the saved record but cannot edit it.

---

## 7. Business Rules Summary

| ID | Rule | Description |
| --- | --- | --- |
| BR-01 | Add-member default | New records default Role to blank |
| BR-02 | Add-member default | New records default Stage to Probation |
| BR-03 | Add-member default | New records default Training / Induction Done to false |
| BR-04 | Add-member default | New records default Main Missions Joined to 0 |
| BR-05 | Add-member default | New records default Other Missions Joined to 0 |
| BR-06 | Add-member default | New records default Ready to Progress to false |
| BR-07 | Add-member default | New records default progression dates to blank |
| BR-08 | Add-member default | New records default Notes / Observations to blank |
| BR-09 | Phase routing | Blank role routes to Phase 1 |
| BR-10 | Phase routing | Applicant routes to Phase 2 |
| BR-11 | Phase routing | New Member routes to Phase 3 |
| BR-12 | Pre-save helper | Save-time helper logic validates and normalises the record before commit |
| BR-13 | Read-only visibility | Read-only users may view permitted data but cannot edit or save |

---

## 8. Assumptions

- The application uses a single canonical member data source.
- Role values are restricted to the approved supported set.
- Phase routing is system-driven from role values.
- Save is a user-driven action and no automatic background save occurs.
- Read-only access is controlled through an external permission model.

---

## 9. Constraints

- The application must preserve consistent behaviour between create and edit flows.
- The application must not allow invalid or incomplete records to be saved.
- The application must apply routing rules consistently across all views that use phase grouping.
- The application must distinguish clearly between editable and read-only access.

---

## 10. Open Questions

| ID | Question | Owner | Status | Answer |
| --- | --- | --- | --- | --- |
| OQ-01 | What is the final agreed date format for progression fields? | [Owner] | Open | <details><summary>A-01</summary> ISO 8601 is used to allow compatibility between any system or code. <br> Any other values entered that do not match this should be automatically reformatted to the approved standard.</details> |
| OQ-02 | Which read-only users may view Notes / Observations? | [Owner] | Open | <details><summary>A-02</summary> Approved users should be able to open any record and view the details. There should be two seperate views for approved users; **read-only** and **edit**. </details> |
| OQ-03 | How should unsupported role values be handled in the UI and save logic? | [Owner] | Open | <details><summary>A-03</summary> If an unsupported role is entered, it should throw an error in the UI and not pass through into the save flow. This will be handled in the **Pre-save helper**.</details> |
| OQ-04 | Should routed phase be stored explicitly or derived dynamically from role? | [Owner] | Open | <details><summary>A-04</summary> The phase routing logic will be done in the shared backend. <br> This is to allow a single source of truth, allowing future updates to occur in only one location, rather than multiple.</details> |

---

## 11. Change History

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 0.1 | 2026-04-07 | Falcon Charade | Initial draft |
| 1.0 | [dd.mm.yyyy] | [Name] | First production draft |

---

## Appendix A: Field Reference

| Field Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| Member Id | Number | Yes | System generated | Unique identifier for the member |
| Member Name | Text | Yes | Blank | Display name of the member |
| Role | Enum | No | Blank | Role used for phase routing |
| Recruiter | Enum | Yes | Blank | Recruiter associated with the member |
| Stage | Enum | Yes | Probation | Current stage of the member |
| Discord Join Date | Date | Yes | Blank | Date the member joined Discord |
| Training / Induction Done | Boolean | Yes | false | Indicates whether induction is complete |
| Progression to Applicant | Date | No | Blank | Date progressed to Applicant |
| Main Missions Joined | Number | Yes | 0 | Count of main missions joined |
| Other Missions Joined | Number | Yes | 0 | Count of other missions joined |
| Ready to Progress | Boolean | Yes | false | Indicates whether the member is ready for progression to New Member |
| Progression to New Member | Date | No | Blank | Date progressed to New Member |
| Progression to Member | Date | No | Blank | Date progressed to Member |
| Notes / Observations | Text | No | Blank | Free-text notes for the member |

---

## Appendix B: Rule Reference

| Rule ID | Name | Description | Applies When |
| --- | --- | --- | --- |
| RR-01 | New member defaults | Applies standard defaults to a new member record | Add-member flow |
| RR-02 | Phase 1 routing | Blank role maps to Phase 1 | Record create or update |
| RR-03 | Phase 2 routing | Applicant maps to Phase 2 | Record update |
| RR-04 | Phase 3 routing | New Member maps to Phase 3 | Record update |
| RR-05 | Pre-save helper execution | Runs validation and normalisation before commit | Save action |
| RR-06 | Read-only protection | Prevents modification for read-only users | Read-only access sessions |
