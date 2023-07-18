
Sub updateStatus()
'
' update the status along with the input
'
    Application.ScreenUpdating = False
    Sheets("Dashboard").Select
    Range("Table5[[Employee Name]:[End Time]]").Select
    Selection.Copy
    Sheets("Logs").Select
    Range("A2").Select
    Do While ActiveCell <> ""
        ActiveCell.Offset(1, 0).Select
    Loop
    ActiveSheet.Paste
    Sheets("Dashboard").Select
    Range("Table5[Comments]").Select
    Selection.Copy
    Sheets("Logs").Select
    Range("E2").Select
    Do While ActiveCell <> ""
        ActiveCell.Offset(1, 0).Select
    Loop
    ActiveSheet.Paste
'
' status page
'
    Sheets("Dashboard").Select
    Dim arr As Variant
    Range("Table5[[Employee Name]]").Select
    Set empRange = Selection
    Range("Table5[[Hours]]").Select
    Set hoursRange = Selection
    ReDim arr(empRange.Rows.Count - 1, 1) As Variant
    For i = 0 To commentsRange.Rows.Count - 1
        arr(i, 0) = empRange.Cells(i)
        arr(i, 1) = hoursRange.Cells(i)
    Next i
    Sheets("Status").Select
    For i = 1 To commentsRange.Rows.Count - 1
        Range("A2").Select
        Do While ActiveCell <> ""
            If LCase(ActiveCell.Value) = LCase(arr(i, 0)) Then
                ActiveCell.Offset(0, 1).Select
                ActiveCell.Value = ActiveCell.Value + arr(i, 1)
                ActiveCell.Offset(0, 1).Select
                ActiveCell.Value = arr(i, 2)
                ActiveCell.Offset(0, -2).Select
            End If
            ActiveCell.Offset(1, 0).Select
        Loop
    Next i
End Sub

' Call the sub procedure
updateStatus
