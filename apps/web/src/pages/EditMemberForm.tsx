import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MEMBER_ROLES,
  MEMBER_STAGES,
  type MemberRole,
  type MemberStage,
  Member,
} from '@shared-types/member/member.types';
import { useMembers } from '@/features/members/MembersProvider';
import {
  hasFormErrors,
  parseEditMemberForm,
  toEditMemberValues,
  type MemberFormErrors,
} from '@/features/members/member-form';

type MemberFormValues = {
  name: string;
  role: MemberRole | '';
  recruiter: string;
  stage: MemberStage;
  joinedAt: Date;
  basicTrainingCompleted?: boolean;
  progressionApplicant?: Date | null;
  joinedMain: number;
  joinedOther: number;
  readyForPromotion: boolean;
  progressionNewMember?: Date | null;
  progressionMember?: Date | null;
  notes?: string | null;
};

interface MemberFormProps {
  title: string;
  description: string;
  submitLabel: string;
  member?: Member;
}

const emptyValues: MemberFormValues = {
  name: '',
  role: '',
  recruiter: '',
  stage: 'Probation',
  joinedAt: new Date(),
  joinedMain: 0,
  joinedOther: 0,
  readyForPromotion: false,
};

function toInitialValues(member: Member | undefined): MemberFormValues {
  if (!member) {
    return emptyValues;
  }

  const values = toEditMemberValues(member);

  return {
    ...values,
    joinedAt: new Date(values.joinedAt),
    progressionApplicant: values.progressionApplicant
      ? new Date(values.progressionApplicant)
      : null,
    progressionNewMember: values.progressionNewMember
      ? new Date(values.progressionNewMember)
      : null,
    progressionMember: values.progressionMember
      ? new Date(values.progressionMember)
      : null,
    notes: values.notes,
  };
}

export function MemberForm({
  title,
  description,
  submitLabel,
  member,
}: MemberFormProps) {
  const navigate = useNavigate();
  const { updateMember } = useMembers();
  const [errors, setErrors] = useState<MemberFormErrors>({});
  const values = toInitialValues(member);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { draft, errors } = parseEditMemberForm(
      new FormData(event.currentTarget),
    );

    if (hasFormErrors(errors)) {
      setErrors(errors);
      return;
    }

    if (member) {
      updateMember(member.id, draft);
    }

    navigate('/');
  }

  return (
    <div className="max-w-3xl space-y-4">
      <Button variant="ghost" asChild>
        <Link to="/">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to members
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="name">User name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={values.name}
                placeholder="Member name"
                required
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name ? (
                <p className="text-sm text-destructive">{errors.name}</p>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue={values.role || undefined}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEMBER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role ? (
                  <p className="text-sm text-destructive">{errors.role}</p>
                ) : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stage">Stage</Label>
                <Select name="stage" defaultValue={values.stage}>
                  <SelectTrigger id="stage">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEMBER_STAGES.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stage ? (
                  <p className="text-sm text-destructive">{errors.stage}</p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recruiter">Recruiter</Label>
              <Input
                id="recruiter"
                name="recruiter"
                defaultValue={values.recruiter}
                placeholder="Recruiter name"
                required
                aria-invalid={Boolean(errors.recruiter)}
              />
              {errors.recruiter ? (
                <p className="text-sm text-destructive">{errors.recruiter}</p>
              ) : null}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="joinedAt">Joined date</Label>
                <Input
                  id="joinedAt"
                  name="joinedAt"
                  type="date"
                  defaultValue={values.joinedAt.toISOString().slice(0, 10)}
                required
                aria-invalid={Boolean(errors.joinedAt)}
              />
              {errors.joinedAt ? (
                <p className="text-sm text-destructive">{errors.joinedAt}</p>
              ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="trainingCompleted">Basic training completed</Label>
                <input
                  id="trainingCompleted"
                  name="basicTrainingCompleted"
                  type="checkbox"
                  defaultChecked={values.basicTrainingCompleted}
                  className="size-4 rounded border-input"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="progressionApplicant">Applicant Progression Date</Label>
                <Input
                  id="progressionApplicant"
                  name="progressionApplicant"
                  type="date"
                  defaultValue={values.progressionApplicant?.toISOString().slice(0, 10)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="joinedMain">Main sessions</Label>
                <Input
                  id="joinedMain"
                  name="joinedMain"
                  type="number"
                  min="0"
                  defaultValue={values.joinedMain}
                  aria-invalid={Boolean(errors.joinedMain)}
                />
                {errors.joinedMain ? (
                  <p className="text-sm text-destructive">{errors.joinedMain}</p>
                ) : null}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="joinedOther">Other sessions</Label>
                <Input
                  id="joinedOther"
                  name="joinedOther"
                  type="number"
                  min="0"
                  defaultValue={values.joinedOther}
                  aria-invalid={Boolean(errors.joinedOther)}
                />
                {errors.joinedOther ? (
                  <p className="text-sm text-destructive">{errors.joinedOther}</p>
                ) : null}
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-md border p-3 text-sm">
              <input
                type="checkbox"
                name="readyForPromotion"
                defaultChecked={values.readyForPromotion}
                className="size-4 rounded border-input"
              />
              Ready for promotion review
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="progressionNewMember">New Member Progression Date</Label>
                <Input
                  id="progressionNewMember"
                  name="progressionNewMember"
                  type="date"
                  defaultValue={values.progressionNewMember?.toISOString().slice(0, 10)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="progressionMember">Full Member Progression Date</Label>
                <Input
                  id="progressionMember"
                  name="progressionMember"
                  type="date"
                  defaultValue={values.progressionMember?.toISOString().slice(0, 10)}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes / Observations</Label>
              <Textarea
                id="notes"
                name="notes"
                defaultValue={values.notes ?? ''}
                placeholder="Additional notes"
                rows={4}
                maxLength={500}
                wrap="soft"
                className="min-h-32 max-w-full resize-y overflow-auto break-words"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button variant="outline" asChild>
                <Link to="/">Cancel</Link>
              </Button>
              <Button type="submit">
                <Save className="size-4" aria-hidden="true" />
                {submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
