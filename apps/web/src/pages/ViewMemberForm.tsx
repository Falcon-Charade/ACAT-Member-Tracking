import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  MEMBER_ROLES,
  MEMBER_STAGES,
  type Member,
} from '@shared-types/member/member.types';
import { toEditMemberValues } from '@/features/members/member-form';

interface MemberFormProps {
  title: string;
  description: string;
  member: Member;
}

const disabledFieldClassName = 'disabled:cursor-default disabled:opacity-70';

export function MemberForm({ title, description, member }: MemberFormProps) {
  const values = toEditMemberValues(member);

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
          <form className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">User name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={values.name}
                placeholder="Member name"
                className={disabledFieldClassName}
                disabled
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select name="role" defaultValue={values.role || undefined} disabled>
                  <SelectTrigger id="role" className={disabledFieldClassName}>
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
              </div>

              <div className="grid gap-2">
                <Label htmlFor="stage">Stage</Label>
                <Select name="stage" defaultValue={values.stage} disabled>
                  <SelectTrigger id="stage" className={disabledFieldClassName}>
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
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="recruiter">Recruiter</Label>
              <Input
                id="recruiter"
                name="recruiter"
                defaultValue={values.recruiter}
                placeholder="Recruiter name"
                className={disabledFieldClassName}
                disabled
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="joinedAt">Joined date</Label>
                <Input
                  id="joinedAt"
                  name="joinedAt"
                  type="date"
                  defaultValue={values.joinedAt}
                  className={disabledFieldClassName}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="basicTrainingCompleted">
                  Basic training completed
                </Label>
                <input
                  id="basicTrainingCompleted"
                  name="basicTrainingCompleted"
                  type="checkbox"
                  defaultChecked={values.basicTrainingCompleted}
                  className="size-4 rounded border-input disabled:cursor-default disabled:opacity-70"
                  disabled
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="progressionApplicant">
                  Applicant Progression Date
                </Label>
                <Input
                  id="progressionApplicant"
                  name="progressionApplicant"
                  type="date"
                  defaultValue={values.progressionApplicant}
                  className={disabledFieldClassName}
                  disabled
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
                  className={disabledFieldClassName}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="joinedOther">Other sessions</Label>
                <Input
                  id="joinedOther"
                  name="joinedOther"
                  type="number"
                  min="0"
                  defaultValue={values.joinedOther}
                  className={disabledFieldClassName}
                  disabled
                />
              </div>
            </div>

            <label className="flex items-center gap-3 rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="readyForPromotion"
                defaultChecked={values.readyForPromotion}
                className="size-4 rounded border-input disabled:cursor-default disabled:opacity-70"
                disabled
              />
              Ready for promotion review
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="progressionNewMember">
                  New Member Progression Date
                </Label>
                <Input
                  id="progressionNewMember"
                  name="progressionNewMember"
                  type="date"
                  defaultValue={values.progressionNewMember}
                  className={disabledFieldClassName}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="progressionMember">
                  Full Member Progression Date
                </Label>
                <Input
                  id="progressionMember"
                  name="progressionMember"
                  type="date"
                  defaultValue={values.progressionMember}
                  className={disabledFieldClassName}
                  disabled
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes / Observations</Label>
              <Textarea
                id="notes"
                name="notes"
                defaultValue={values.notes}
                placeholder="Additional notes"
                rows={4}
                maxLength={500}
                wrap="soft"
                className="min-h-32 max-w-full resize-y overflow-auto break-words disabled:cursor-default disabled:opacity-70"
                disabled
              />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button variant="outline" asChild>
                <Link to="/">Close</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
